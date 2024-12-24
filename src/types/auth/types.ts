export interface AuthUser {
  id: string;
  displayName: string;
  display_name?: string;
  bio?: string;
  website?: string;
  location?: string;
  created_at?: string;
  createdAt?: string;
  email?: string;
  role?: UserRole;
  settings?: Record<string, any>;
}

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export interface AuthState {
  user: AuthUser | null;
  session: any | null;
  isLoading: boolean;
  error: string | null;
}