import { Json } from '@/types/core/json';
import { Database } from './base';
import { Profile } from '@/types/core/auth';

export interface Session {
  id: string;
  user_id?: string;
  refresh_token?: string;
  created_at?: string;
  expires_at?: string;
  metadata?: Json;
}
