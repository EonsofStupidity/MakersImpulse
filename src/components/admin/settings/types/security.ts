export interface SecuritySettings {
  ip_whitelist: string[];
  ip_blacklist: string[];
  max_login_attempts: number;
  lockout_duration_minutes: number;
  session_timeout_minutes: number;
  rate_limit_requests: number;
  rate_limit_window_minutes: number;
  allowed_countries: string[];
}

export interface SiteSecuritySettings {
  security_settings: SecuritySettings;
}