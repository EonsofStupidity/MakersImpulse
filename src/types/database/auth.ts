import { TableDefinition } from './core';
import { UserRole } from '../auth';

export interface ProfilesTable {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  role: UserRole | null;
  created_at: string;
  updated_at: string;
  bio: string | null;
  website: string | null;
  location: string | null;
  last_seen: string | null;
  is_banned: boolean | null;
  ban_reason: string | null;
  banned_at: string | null;
  banned_by: string | null;
  two_factor_enabled: boolean | null;
  two_factor_secret: string | null;
  onboarding_completed: boolean | null;
  gamification_enabled: boolean | null;
  visual_editor_enabled: boolean | null;
  last_login_at: string | null;
}

export type AuthTables = {
  profiles: TableDefinition<ProfilesTable>;
};