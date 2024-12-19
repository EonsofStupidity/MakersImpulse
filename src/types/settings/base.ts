export interface BaseSettings {
  id?: string;
  site_title: string;
  tagline?: string;
  logo_url?: string;
  favicon_url?: string;
  theme_mode?: 'light' | 'dark' | 'system';
  security_settings?: {
    ip_blacklist: string[];
    ip_whitelist: string[];
    max_login_attempts: number;
    rate_limit_requests: number;
    session_timeout_minutes: number;
    lockout_duration_minutes: number;
    rate_limit_window_minutes: number;
  };
  state_version?: number;
  last_sync?: string;
  updated_at?: string;
  updated_by?: string;
}

export const DEFAULT_SETTINGS: BaseSettings = {
  site_title: 'MakersImpulse',
  tagline: 'Create, Share, Inspire',
  theme_mode: 'dark',
  security_settings: {
    ip_blacklist: [],
    ip_whitelist: [],
    max_login_attempts: 5,
    rate_limit_requests: 100,
    session_timeout_minutes: 60,
    lockout_duration_minutes: 30,
    rate_limit_window_minutes: 5
  }
};