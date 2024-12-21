import { ThemeBase } from './types';
import { Json } from '@/types/database';

// Database-specific type that handles JSON serialization
export interface DatabaseSettingsRow extends ThemeBase {
  id: string;
  updated_at?: string;
  updated_by?: string;
  state_version?: number;
  last_sync?: string;
}

export type SettingsFormData = Partial<ThemeBase>;