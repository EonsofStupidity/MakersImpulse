import { Database } from './database';

export type UserRole = Database['public']['Enums']['user_role'];
export type ThemeMode = Database['public']['Enums']['theme_mode'];

export interface AuthUser {
  id: string;
  email?: string;
  role?: UserRole;
  username?: string;
  display_name?: string;
  profile?: Profile;
}

export interface AuthSession {
  user: AuthUser;
  expires_at?: number;
}

export interface AuthState {
  isLoading: boolean;
  hasAccess: boolean;
  error: string | null;
}

export type Profile = Database['public']['Tables']['profiles']['Row'];

export interface RoleHierarchy {
  [key: string]: number;
}