import { ThemeBase } from './types';
import { Json } from '@/types/database';

export interface DatabaseSettingsRow extends ThemeBase {
  id: string;
  updated_at?: string;
  updated_by?: string;
  state_version?: number;
  last_sync?: string;
  settings?: Json;
}

export type SettingsFormData = Partial<ThemeBase>;