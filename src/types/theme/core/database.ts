import { ThemeBase } from './types';
import { Json } from '@/types/database/json';

export interface DatabaseThemeRow extends Omit<ThemeBase, 'preview_preferences' | 'inherited_settings'> {
  id: string;
  preview_preferences: Json;
  inherited_settings: Json;
  updated_at?: string;
  updated_by?: string;
  state_version?: number;
  last_sync?: string;
}

export interface DatabaseSettingsRow {
  id: string;
  setting_key: string;
  setting_value?: string;
  setting_type?: string;
  created_at?: string;
  updated_at?: string;
  metadata?: Json;
  security_settings?: Json;
}

export type SettingsFormData = Partial<ThemeBase>;