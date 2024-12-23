import { Json } from '@/types/core/json';

export interface SecuritySettings extends Record<string, Json | undefined> {
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
  details?: Record<string, Json>;
  ip_address?: string;
  created_at: string;
  metadata?: Record<string, Json>;
}

export interface SecurityAuditLog extends SecurityEvent {
  user_agent?: string;
  profiles?: {
    username: string;
    display_name: string;
  };
}