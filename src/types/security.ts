export * from './core/security';

export interface RateLimitConfig {
  enabled: boolean;
  max_requests: number;
  window_minutes: number;
}
