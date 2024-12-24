export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export interface AuthUser {
  id: string;
  email?: string;
  displayName: string;
  bio?: string;
  website?: string;
  location?: string;
  created_at: string;
  role?: UserRole;
  metadata?: Record<string, any>;
}