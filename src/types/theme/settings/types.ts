import { ThemeBase } from '../core/types';

// Site-wide settings separate from theme
export interface SiteSettings {
  site_title: string;
  tagline?: string;
  logo_url?: string;
  favicon_url?: string;
  security_settings?: SecuritySettings;
  maintenance_mode?: boolean;
  analytics_enabled?: boolean;
  cache_ttl?: number;
  max_upload_size?: number;
  allowed_file_types?: string[];
  updated_at?: string;
  updated_by?: string;
}

// Security specific settings
export interface SecuritySettings {
  ip_blacklist: string[];
  ip_whitelist: string[];
  max_login_attempts: number;
  rate_limit_requests: number;
  session_timeout_minutes: number;
  lockout_duration_minutes: number;
  rate_limit_window_minutes: number;
}

// Combined settings type for the form
export interface SettingsFormData extends SiteSettings {
  theme?: Partial<ThemeBase>;
}

// Database row type
export interface DatabaseSettingsRow extends SiteSettings {
  id: string;
  state_version?: number;
  last_sync?: string;
}