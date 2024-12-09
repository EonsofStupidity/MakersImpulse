import { Database } from './database';

export type UserActivity = Database['public']['Tables']['user_activity']['Row'];
export type SecurityEvent = Database['public']['Tables']['security_events']['Row'];
export type AuditLog = Database['public']['Tables']['security_audit_logs']['Row'];

export interface ActivityMetadata {
  ip?: string;
  userAgent?: string;
  location?: string;
  device?: string;
  timestamp: string;
}

export interface SecurityMetadata extends ActivityMetadata {
  severity: 'low' | 'medium' | 'high' | 'critical';
  impact?: string;
  resolution?: string;
}