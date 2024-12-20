import { ThemeBase } from '../core/base';

export interface DatabaseSettings extends ThemeBase {
  id: string;
  updated_at?: string;
  updated_by?: string;
  state_version?: number;
  last_sync?: string;
}

export type SettingsFormData = Partial<ThemeBase>;