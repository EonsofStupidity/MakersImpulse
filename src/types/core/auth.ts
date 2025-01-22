import { Json } from './json';

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export interface AuthUser {
  id: string;
  email?: string | null;
  role?: UserRole;
  username?: string;
  displayName?: string;
  bio?: string;
  website?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
  user_metadata?: {
    avatar_url?: string;
    [key: string]: Json;
  };
}

export interface Profile {
  id: string;
  username?: string;
  display_name?: string;
  avatar_url?: string;
  role?: UserRole;
  bio?: string;
  website?: string;
  location?: string;
  created_at?: string;
  updated_at?: string;
  last_seen?: string;
  metadata?: Record<string, Json>;
  is_banned?: boolean;
  ban_reason?: string | null;
  banned_at?: string | null;
  banned_by?: string | null;
}
