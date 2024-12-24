import { Json } from '@/types/core/json';

export interface Settings {
  // Configuration only
  id?: string;
  site_title: string;
  tagline?: string;
  logo_url?: string;
  favicon_url?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
  metadata?: Record<string, Json>;
}

export interface SettingsResponse {
  id: string;
  value: Settings;
}