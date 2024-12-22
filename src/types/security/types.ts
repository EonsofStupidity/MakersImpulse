export interface SecuritySettings {
  ip_blacklist: string[];
  ip_whitelist: string[];
  max_login_attempts: number;
  lockout_duration_minutes: number;
  rate_limit_requests: number;
  rate_limit_window_minutes: number;
  session_timeout_minutes: number;
}

export interface RateLimitConfig {
  enabled: boolean;
  max_requests: number;
  window_minutes: number;
}

export interface SecurityAuditLog {
  id: string;
  user_id: string;
  action_type: string;
  ip_address?: string;
  user_agent?: string;
  metadata?: Record<string, any>;
  created_at: string;
}