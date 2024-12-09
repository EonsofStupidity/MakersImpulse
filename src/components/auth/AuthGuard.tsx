import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  unauthorizedComponent,
  onError
}: AuthGuardProps) => {
  const navigate = useNavigate();
  const { isLoading, hasAccess, error } = useRoleCheck(requireAuth, requiredRole, fallbackPath);

  useEffect(() => {
    console.log('AuthGuard state:', { isLoading, hasAccess, error, requireAuth, requiredRole });
    
    if (error) {
      console.error('AuthGuard error:', error);
      if (onError) {
        onError(error);
      }
      const errorMessage = error instanceof Error ? error.message : 
        typeof error === 'string' ? error : 
        'message' in error ? error.message : 
        'Access denied';
      
      toast.error(errorMessage);
      navigate(fallbackPath, { replace: true });
    }
  }, [isLoading, hasAccess, error, requireAuth, requiredRole, fallbackPath, navigate, onError]);

  if (isLoading) {
    console.log('AuthGuard: Loading state');
    return loadingComponent || <AuthLoading />;
  }

  if (!hasAccess) {
    console.log('AuthGuard: Access denied');
    return unauthorizedComponent || <Unauthorized />;
  }

  console.log('AuthGuard: Access granted');
  return <>{children}</>;
};