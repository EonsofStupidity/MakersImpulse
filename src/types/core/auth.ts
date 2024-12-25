import { UserRole } from './base';

export interface AuthUser {
  id: string;
  email: string;
  displayName?: string;
  username?: string;
  bio?: string;
  website?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
  avatar_url?: string;
  last_seen?: string;
  metadata?: Record<string, unknown>;
}

export interface Profile {
  id: string;
  username?: string;
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
  location?: string;
  created_at?: string;
  updated_at?: string;
  role?: UserRole;
  last_seen?: string;
  metadata?: Record<string, unknown>;
}