/**
 * Core security settings interface
 */
export interface SecuritySettings {
  ip_blacklist: string[];
  ip_whitelist: string[];
  max_login_attempts: number;
  rate_limit_requests: number;
  session_timeout_minutes: number;
  lockout_duration_minutes: number;
  rate_limit_window_minutes: number;
}

/**
 * Rate limiting configuration
 */
export interface RateLimitConfig {
  enabled: boolean;
  max_requests: number;
  window_minutes: number;
}

/**
 * Security event interface
 */
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

/**
 * Security log interface extending security event
 */
export interface SecurityLog extends SecurityEvent {
  user_agent?: string;
  profiles?: {
    username: string;
    display_name: string;
  };
}

/**
 * Security audit log interface
 */
export interface SecurityAuditLog {
  id: string;
  user_id: string;
  action_type: string;
  ip_address?: string;
  user_agent?: string;
  metadata?: Record<string, any>;
  created_at: string;
}

// Export all security-related types from this single source
export * from './security/types';