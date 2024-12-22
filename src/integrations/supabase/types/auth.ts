import { Json } from './base';
import { Database } from './base';

export type UserRole = Database['public']['Enums']['user_role'];

export interface Profile {
  id: string;
  username?: string;
  display_name?: string;
  avatar_url?: string;
  role?: UserRole;
  created_at?: string;
  updated_at?: string;
  bio?: string;
  website?: string;
  location?: string;
  metadata?: Json;
}

export interface Session {
  id: string;
  user_id?: string;
  refresh_token?: string;
  created_at?: string;
  expires_at?: string;
  metadata?: Json;
}