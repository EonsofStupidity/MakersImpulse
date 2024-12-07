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
  loadingComponent?: React.ReactNode;
  unauthorizedComponent?: React.ReactNode;
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
  fallbackPath = '/',
  loadingComponent,
  unauthorizedComponent
}: AuthGuardProps) => {
  const { session } = useSession();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const checkAccess = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Not authenticated but auth required
        if (!session && requireAuth) {
          console.log('Auth required but no session found');
          toast.error("Please sign in to access this page");
          navigate('/login', { replace: true });
          return;
        }

        // Authenticated but no role required
        if (session && !requiredRole) {
          if (isMounted) setHasAccess(true);
          return;
        }

        // Role check required
        if (session && requiredRole) {
          const { data: profile, error: fetchError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (fetchError) {
            console.error('Error fetching user role:', fetchError);
            throw new Error('Error checking permissions');
          }

          if (!profile?.role) {
            console.error('No role found for user');
            throw new Error('No role assigned');
          }

          // Handle multiple required roles
          const requiredRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
          
          // Check if user has sufficient role level
          const userRoleLevel = roleHierarchy[profile.role as UserRole];
          const hasRequiredRole = requiredRoles.some(role => 
            userRoleLevel >= roleHierarchy[role]
          );

          if (!hasRequiredRole) {
            console.log(`User role ${profile.role} insufficient for required roles:`, requiredRoles);
            throw new Error("Insufficient permissions");
          }

          if (isMounted) setHasAccess(true);
        }
      } catch (error) {
        console.error('Error in auth check:', error);
        const errorMessage = error instanceof Error ? error.message : "Error checking permissions";
        if (isMounted) {
          setError(errorMessage);
          toast.error(errorMessage);
        }
        navigate(fallbackPath, { replace: true });
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    checkAccess();

    return () => {
      isMounted = false;
    };
  }, [session, requireAuth, requiredRole, navigate, fallbackPath]);

  if (isLoading) {
    return loadingComponent || (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !hasAccess) {
    return unauthorizedComponent || null;
  }

  return <>{children}</>;
};