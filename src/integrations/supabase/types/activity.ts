import { Database } from './database';

export type ActivityLog = Database['public']['Tables']['enhanced_audit_logs']['Row'];
export type SecurityLog = Database['public']['Tables']['security_logs']['Row'];
export type UserActivity = Database['public']['Tables']['user_activity']['Row'];