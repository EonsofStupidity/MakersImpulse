import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from './SessionContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

// Define allowed roles
type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: UserRole | UserRole[];
  fallbackPath?: string;
}

const roleHierarchy: Record<UserRole, number> = {
  'subscriber': 0,
  'maker': 1,
  'admin': 2,
  'super_admin': 3
};

export const AuthGuard = ({ 
  children, 
  requireAuth = true, 
  requiredRole,
  fallbackPath = '/'
}: AuthGuardProps) => {
  const { session } = useSession();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        setIsLoading(true);

        // Not authenticated but auth required
        if (!session && requireAuth) {
          console.log('Auth required but no session found');
          toast.error("Please sign in to access this page");
          navigate('/login');
          return;
        }

        // Authenticated but no role required
        if (session && !requiredRole) {
          setHasAccess(true);
          return;
        }

        // Role check required
        if (session && requiredRole) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (error) {
            console.error('Error fetching user role:', error);
            toast.error("Error checking permissions");
            navigate(fallbackPath);
            return;
          }

          if (!profile?.role) {
            console.error('No role found for user');
            toast.error("No role assigned");
            navigate(fallbackPath);
            return;
          }

          // Handle multiple required roles
          const requiredRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
          
          // Check if user has sufficient role level
          const userRoleLevel = roleHierarchy[profile.role];
          const hasRequiredRole = requiredRoles.some(role => 
            userRoleLevel >= roleHierarchy[role]
          );

          if (!hasRequiredRole) {
            console.log(`User role ${profile.role} insufficient for required roles:`, requiredRoles);
            toast.error("You don't have permission to access this page");
            navigate(fallbackPath);
            return;
          }

          setHasAccess(true);
        }
      } catch (error) {
        console.error('Error in auth check:', error);
        toast.error("Error checking permissions");
        navigate(fallbackPath);
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, [session, requireAuth, requiredRole, navigate, fallbackPath]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!hasAccess) {
    return null;
  }

  return <>{children}</>;
};