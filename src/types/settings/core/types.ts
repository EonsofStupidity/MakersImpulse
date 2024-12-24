export type SettingType = 'theme' | 'system' | 'user' | 'security';

export interface SettingsFormData {
  // Site Configuration
  site_title: string;
  tagline?: string;
  
  // Assets
  logo_url?: string;
  favicon_url?: string;
  
  // Metadata
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