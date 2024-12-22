import { BaseEntity } from '../core/common';

export interface SecuritySettings extends BaseEntity {
  ip_blacklist: string[];
  ip_whitelist: string[];
  max_login_attempts: number;
  rate_limit_requests: number;
  session_timeout_minutes: number;
  lockout_duration_minutes: number;
  rate_limit_window_minutes: number;
}

export interface SecurityLog extends BaseEntity {
  user_id: string;
  event_type: string;
  severity: string;
  details: string;
  ip_address?: string;
  user_agent?: string;
}