import { ThemeBase } from '../core/types';
import { Json } from '@/types/database';

export interface DatabaseThemeRow extends ThemeBase {
  id: string;
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
}

export type SettingsFormData = Partial<ThemeBase>;