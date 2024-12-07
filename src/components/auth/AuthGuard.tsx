import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from './SessionContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: 'admin' | 'super_admin';
}

export const AuthGuard = ({ children, requireAuth = true, requiredRole }: AuthGuardProps) => {
  const { session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      if (!session && requireAuth) {
        toast.error("Please sign in to access this page");
        navigate('/login');
        return;
      }

      if (session && requiredRole) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (error || !profile) {
          console.error('Error fetching user role:', error);
          toast.error("Error checking permissions");
          navigate('/');
          return;
        }

        if (!['admin', 'super_admin'].includes(profile.role)) {
          toast.error("You don't have permission to access this page");
          navigate('/');
          return;
        }
      }
    };

    checkAccess();
  }, [session, requireAuth, requiredRole, navigate]);

  if (!session && requireAuth) {
    return null;
  }

  return <>{children}</>;
};