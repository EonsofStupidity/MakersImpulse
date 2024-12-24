export interface ApplicationSettings {
  id?: string;
  site_title: string;
  tagline?: string;
  logo_url?: string;
  favicon_url?: string;
  metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}

// Form data type for settings only - NO THEME STUFF
export interface SettingsFormData {
  site_title: string;
  tagline?: string;
  logo_url?: string;
  favicon_url?: string;
}