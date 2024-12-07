import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../SessionContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UserRole, RoleHierarchy, AuthState } from '../types';

const roleHierarchy: RoleHierarchy = {
  'subscriber': 0,
  'maker': 1,
  'admin': 2,
  'super_admin': 3
};

export const useRoleCheck = (
  requireAuth: boolean,
  requiredRole?: UserRole | UserRole[],
  fallbackPath: string = '/'
) => {
  const { session } = useSession();
  const navigate = useNavigate();
  const [state, setState] = useState<AuthState>({
    isLoading: true,
    hasAccess: false,
    error: null
  });

  useEffect(() => {
    let isMounted = true;

    const checkAccess = async () => {
      try {
        console.log('Starting role check with:', {
          requireAuth,
          requiredRole,
          sessionExists: !!session,
          userId: session?.user?.id
        });

        if (isMounted) {
          setState(prev => ({ ...prev, isLoading: true, error: null }));
        }

        // Handle unauthenticated users
        if (!session && requireAuth) {
          console.log('Auth required but no session found');
          throw new Error('Authentication required');
        }

        // Handle authenticated users with no role requirement
        if (session && !requiredRole) {
          console.log('User authenticated, no role required');
          if (isMounted) {
            setState(prev => ({ ...prev, hasAccess: true, isLoading: false }));
          }
          return;
        }

        // Handle role checks
        if (session && requiredRole) {
          console.log('Checking user role for session:', session.user.id);
          
          const { data: profile, error: fetchError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          console.log('Profile query result:', { profile, fetchError });

          if (fetchError) {
            console.error('Error fetching user role:', fetchError);
            throw new Error('Error verifying permissions');
          }

          if (!profile) {
            console.error('No profile found for user');
            throw new Error('No profile found');
          }

          const userRole = profile.role;
          console.log('User role found:', userRole);
          
          if (!userRole) {
            console.error('No role assigned to user profile');
            throw new Error('No role assigned');
          }

          const requiredRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
          const userRoleLevel = roleHierarchy[userRole as UserRole];
          
          const hasRequiredRole = requiredRoles.some(role => 
            userRoleLevel >= roleHierarchy[role]
          );

          console.log('Role check result:', {
            userRole,
            requiredRoles,
            userRoleLevel,
            hasRequiredRole
          });

          if (!hasRequiredRole) {
            throw new Error('Insufficient permissions');
          }

          if (isMounted) {
            setState(prev => ({ 
              ...prev, 
              hasAccess: true,
              isLoading: false,
              error: null
            }));
          }
        }
      } catch (error) {
        console.error('Error in auth check:', error);
        const errorMessage = error instanceof Error ? error.message : 'Error checking permissions';
        
        if (isMounted) {
          setState(prev => ({ 
            ...prev, 
            error: errorMessage,
            hasAccess: false,
            isLoading: false
          }));
        }

        toast.error(errorMessage);
        navigate(fallbackPath, { replace: true });
      }
    };

    checkAccess();

    return () => {
      isMounted = false;
    };
  }, [session, requireAuth, requiredRole, navigate, fallbackPath]);

  return state;
};