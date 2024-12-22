import { Json } from '../core/json';

export interface ThemeSyncState {
  last_sync: string;
  sync_status: 'pending' | 'syncing' | 'synced' | 'error';
  sync_error?: string;
  pending_changes: Record<string, Json>;
}

export interface ThemeSyncOptions {
  debounce_ms: number;
  retry_attempts: number;
  batch_updates: boolean;
}