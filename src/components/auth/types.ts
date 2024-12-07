export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: UserRole | UserRole[];
  fallbackPath?: string;
  loadingComponent?: React.ReactNode;
  unauthorizedComponent?: React.ReactNode;
}

export interface RoleHierarchy {
  [key: string]: number;
}

export interface AuthState {
  isLoading: boolean;
  hasAccess: boolean;
  error: string | null;
}