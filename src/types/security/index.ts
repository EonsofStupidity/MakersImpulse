export interface SecuritySettings {
  ip_blacklist: string[];
  ip_whitelist: string[];
  max_login_attempts: number;
  rate_limit_requests: number;
  session_timeout_minutes: number;
  lockout_duration_minutes: number;
  rate_limit_window_minutes: number;
}

export interface SecurityLog {
  id: string;
  event_type: string;
  severity: string;
  details: Record<string, unknown>;
  ip_address: string | null;
  created_at: string;
  profiles?: {
    username: string;
    display_name: string;
  };
}