export interface SiteConfiguration {
  id: string;
  site_title: string;
  tagline?: string;
  logo_url?: string;
  favicon_url?: string;
  updated_at?: string;
  updated_by?: string;
  metadata?: Record<string, any>;
}

export interface SiteSettings {
  setting_key: string;
  setting_value?: string;
  setting_type?: string;
  created_at?: string;
  updated_at?: string;
  metadata?: Record<string, any>;
}

export type SiteSettingsFormData = Partial<SiteSettings>;