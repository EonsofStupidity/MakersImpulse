import { Json } from '@/types/core/json';

export type SettingType = 'theme' | 'system' | 'user' | 'security';

export interface SettingsFormData {
  // ONLY configuration/metadata
  id?: string;
  site_title: string;
  tagline?: string;
  logo_url?: string;
  favicon_url?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}

export interface UnifiedSetting<T = Json> {
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