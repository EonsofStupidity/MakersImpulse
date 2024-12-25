import { ThemeBase } from './theme';
import { Json } from './base';
import { SettingType } from './base';

export interface Settings {
  id: string;
  category: SettingType;
  key: string;
  value: Json;
  metadata?: Record<string, unknown>;
  is_encrypted?: boolean;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}

export type SettingsFormData = ThemeBase;

export interface ThemeState extends ThemeBase {
  isDirty?: boolean;
  lastSync?: Date | null;
  syncStatus?: 'idle' | 'syncing' | 'error';
  syncError?: string;
}

export interface ThemeLifecycleState {
  status: 'initializing' | 'ready' | 'error' | 'deactivating';
  error?: string;
}

export interface ThemeSyncState {
  status: 'pending' | 'syncing' | 'completed' | 'error';
  last_sync: string;
  error?: string;
}