import { Json } from '../core/json';

export type ThemeLifecycleState = 'initializing' | 'active' | 'deactivating' | 'cleanup';

export interface ThemeLifecycle {
  state: ThemeLifecycleState;
  initialized_at?: string;
  last_active?: string;
  cleanup_required: boolean;
  metadata: Record<string, Json>;
}