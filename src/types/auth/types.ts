export type UserRole = 'admin' | 'super_admin' | 'moderator' | 'subscriber';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
  location?: string;
  created_at: string;
  updated_at?: string;
  last_sign_in_at?: string;
  metadata?: Record<string, any>;
}

export interface Settings {
  theme?: string;
  notifications?: boolean;
  language?: string;
  timezone?: string;
  [key: string]: any;
}