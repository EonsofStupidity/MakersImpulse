import { ThemeBase } from './base';

export interface DatabaseSettingsRow extends ThemeBase {
  id: string;
  updated_at?: string;
  updated_by?: string;
  state_version?: number;
  last_sync?: string;
}

export type SettingsFormData = Partial<ThemeBase>;