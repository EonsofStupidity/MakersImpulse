export interface SecuritySettings {
  ip_blacklist: string[];
  ip_whitelist: string[];
  max_login_attempts: number;
  rate_limit_requests: number;
  session_timeout_minutes: number;
  lockout_duration_minutes: number;
  rate_limit_window_minutes: number;
}

export interface SecurityEvent {
  id: string;
  user_id?: string;
  event_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  details?: Record<string, any>;
  ip_address?: string;
  created_at?: string;
  metadata?: Record<string, any>;
}

export interface SecurityLog extends SecurityEvent {
  user_agent?: string;
}

export interface SecurityConfiguration {
  id: string;
  security_settings: SecuritySettings;
  updated_at?: string;
  updated_by?: string;
}