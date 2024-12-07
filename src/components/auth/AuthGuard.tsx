import { AuthGuardProps } from './types';
import { useRoleCheck } from './hooks/useRoleCheck';
import { AuthLoading } from './components/AuthLoading';
import { Unauthorized } from './components/Unauthorized';

export const AuthGuard = ({ 
  children, 
  requireAuth = true, 
  requiredRole,
  fallbackPath = '/',
  loadingComponent,
  unauthorizedComponent
}: AuthGuardProps) => {
  const { isLoading, hasAccess, error } = useRoleCheck(requireAuth, requiredRole, fallbackPath);

  if (isLoading) {
    return loadingComponent || <AuthLoading />;
  }

  if (error || !hasAccess) {
    return unauthorizedComponent || <Unauthorized />;
  }

  return <>{children}</>;
};