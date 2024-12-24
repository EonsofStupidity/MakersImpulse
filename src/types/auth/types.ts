export interface AuthUser {
  id: string;
  displayName: string;
  display_name?: string;
  bio?: string;
  website?: string;
  location?: string;
  created_at?: string;
  email?: string;
  role?: UserRole;
}

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';