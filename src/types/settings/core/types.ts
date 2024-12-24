import { ThemeBase } from '@/types/theme/core/types';

export type SettingType = 'theme' | 'system' | 'user' | 'security';

export interface SettingsFormData extends ThemeBase {
  id?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}

export interface UnifiedSetting<T = any> {
  id: string;
  category: SettingType;
  key: string;
  value: T;
  metadata?: Record<string, any>;
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