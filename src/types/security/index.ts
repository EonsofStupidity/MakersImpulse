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
  error_message?: string;
  stack_trace?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  profiles?: {
    username?: string;
    display_name?: string;
  };
  ip_address?: string;
}