import { Json } from "./database/json";

export type SettingType = 'theme' | 'security' | 'content' | 'system' | 'user' | 'notification' | 'workflow';

export interface UnifiedSetting {
  id: string;
  category: SettingType;
  key: string;
  value: Json;
  metadata?: Json;
  is_encrypted: boolean;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}

export interface SettingsResponse {
  data: UnifiedSetting | null;
  error: Error | null;
}

export interface SettingsUpdateResponse {
  success: boolean;
  error?: string;
}