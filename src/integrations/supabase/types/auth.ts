import { Database } from './database';

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type UserRole = Database['public']['Enums']['user_role'];
export type ThemeMode = Database['public']['Enums']['theme_mode'];

export interface AuthSession {
  user: {
    id: string;
    email?: string;
    role?: UserRole;
  };
  expires_at?: number;
}

export interface AuthUser {
  id: string;
  email?: string;
  role?: UserRole;
  profile?: Profile;
}

export interface AuthState {
  isLoading: boolean;
  hasAccess: boolean;
  error: string | null;
}

export interface RoleHierarchy {
  [key: string]: number;
}