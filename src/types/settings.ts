import { Json } from './core/json';

export type SettingType = 'theme' | 'system' | 'user' | 'security';

export interface UnifiedSetting<T extends Json = Json> {
  id: string;
  category: SettingType;
  key: string;
  value: T;
  metadata?: Record<string, Json>;
  is_encrypted?: boolean;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}

export interface SettingsResponse<T = any> {
  id: string;
  value: T;
}