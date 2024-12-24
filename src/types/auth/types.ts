export interface AuthUser {
  id: string;
  displayName: string;
  bio?: string;
  website?: string;
  location?: string;
  createdAt: string;
  email?: string;
}

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';