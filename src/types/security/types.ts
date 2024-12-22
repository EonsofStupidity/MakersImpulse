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
  user_id: string;
  event_type: string;
  severity: string;
  details: Record<string, unknown>;
  ip_address?: string;
  created_at: string;
}

export interface SecurityEvent {
  id: string;
  user_id?: string;
  event_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  details?: Record<string, any>;
  ip_address?: string;
  created_at: string;
  metadata?: Record<string, any>;
}

export interface SecurityAuditLog extends SecurityEvent {
  user_agent?: string;
  profiles?: {
    username: string;
    display_name: string;
  };
}