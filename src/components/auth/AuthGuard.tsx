import { useEffect } from 'react';
import { AuthGuardProps } from './types';
import { useRoleCheck } from './hooks/useRoleCheck';
import { AuthLoading } from './components/AuthLoading';
import { Unauthorized } from './components/Unauthorized';
import { toast } from 'sonner';

export const AuthGuard = ({ 
  children, 
  requireAuth = true, 
  requiredRole,
  fallbackPath = '/',
  loadingComponent,
  unauthorizedComponent
}: AuthGuardProps) => {
  const { isLoading, hasAccess, error } = useRoleCheck(requireAuth, requiredRole, fallbackPath);

  useEffect(() => {
    console.log('AuthGuard state:', { isLoading, hasAccess, error, requireAuth, requiredRole });
    
    if (error) {
      console.error('AuthGuard error:', error);
      toast.error(error);
    }
  }, [isLoading, hasAccess, error, requireAuth, requiredRole]);

  if (isLoading) {
    console.log('AuthGuard: Loading state');
    return loadingComponent || <AuthLoading />;
  }

  if (error || !hasAccess) {
    console.log('AuthGuard: Access denied', { error, hasAccess });
    return unauthorizedComponent || <Unauthorized />;
  }

  console.log('AuthGuard: Access granted');
  return <>{children}</>;
};