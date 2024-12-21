import { Theme } from './types';

export interface DatabaseSettingsRow extends Theme {
  id: string;
  updated_at?: string;
  updated_by?: string;
  state_version?: number;
  last_sync?: string;
}

export type SettingsFormData = Partial<Theme>;