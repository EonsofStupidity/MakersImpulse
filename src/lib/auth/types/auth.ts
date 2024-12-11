import { Session, User } from '@supabase/supabase-js';

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export interface AuthUser extends User {
  role?: UserRole;
  username?: string;
  displayName?: string;
}

export interface AuthSession extends Session {
  user: AuthUser;
}

export interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  isOffline: boolean;
}

export interface SecurityEvent {
  userId: string;
  eventType: string;
  severity: 'low' | 'medium' | 'high';
  details?: Record<string, any>;
  timestamp: string;
}

export interface SessionConfig {
  timeoutMinutes: number;
  maxConcurrentSessions: number;
  refreshThresholdMinutes: number;
}

export interface AuthError extends Error {
  code?: string;
  statusCode?: number;
  details?: Record<string, any>;
}