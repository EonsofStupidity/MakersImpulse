import { ThemeBase } from './types';
import { Json } from '@/types/database/json';

export interface DatabaseThemeRow extends Omit<ThemeBase, 'preview_preferences' | 'inherited_settings'> {
  preview_preferences: string; // JSON string in DB
  inherited_settings: string; // JSON string in DB
}

export interface DatabaseSettingsRow extends ThemeBase {
  id: string;
  updated_at?: string;
  updated_by?: string;
  state_version?: number;
  last_sync?: string;
}