import { useState, useEffect } from 'react';
import { useAuth } from '../AuthProvider';

interface AuthState {
  isLoading: boolean;
  hasAccess: boolean;
  error: Error | null;
}

const roleHierarchy: { [key: string]: number } = {
  'subscriber': 0,
  'maker': 1,
  'admin': 2,
  'super_admin': 3
};

export const useRoleCheck = (
  requireAuth: boolean,
  requiredRole?: string | string[]
) => {
  const { user, isLoading: authLoading } = useAuth();
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
          userExists: !!user,
          userId: user?.id
        });

        if (isMounted) {
          setState(prev => ({ ...prev, isLoading: true, error: null }));
        }

        if (!user && requireAuth) {
          console.log('Auth required but no user found');
          throw new Error('Authentication required');
        }

        if (user && !requiredRole) {
          console.log('User authenticated, no role required');
          if (isMounted) {
            setState(prev => ({ ...prev, hasAccess: true, isLoading: false }));
          }
          return;
        }

        if (user && requiredRole && user.role) {
          console.log('Checking user role:', user.role);
          
          const userRoleLevel = roleHierarchy[user.role];
          const requiredRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
          
          const hasRequiredRole = requiredRoles.some(role => 
            userRoleLevel >= roleHierarchy[role]
          );

          console.log('Role check result:', {
            userRole: user.role,
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
        if (isMounted) {
          setState(prev => ({ 
            ...prev, 
            error: error instanceof Error ? error : new Error('Error checking permissions'),
            hasAccess: false,
            isLoading: false
          }));
        }
      }
    };

    if (!authLoading) {
      checkAccess();
    }

    return () => {
      isMounted = false;
    };
  }, [user, requireAuth, requiredRole, authLoading]);

  return state;
};
