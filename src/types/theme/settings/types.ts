import { ThemeBase } from '../core/types';

export interface SecuritySettings {
  ip_blacklist: string[];
  ip_whitelist: string[];
  max_login_attempts: number;
  rate_limit_requests: number;
  session_timeout_minutes: number;
  lockout_duration_minutes: number;
  rate_limit_window_minutes: number;
}

export interface SiteSettings {
  theme: ThemeBase;
  security: SecuritySettings;
  maintenance_mode?: boolean;
  analytics_enabled?: boolean;
  cache_ttl?: number;
  max_upload_size?: number;
  allowed_file_types?: string[];
}