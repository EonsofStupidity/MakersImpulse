import { ThemeBase } from './types';

export type ThemeSyncState = 'idle' | 'syncing' | 'error';

export interface ThemeSyncOptions {
  debounceMs?: number;
  retryAttempts?: number;
  onSyncComplete?: (theme: ThemeBase) => void;
  onSyncError?: (error: Error) => void;
}

export interface ThemeSyncHook {
  state: ThemeSyncState;
  lastSync: Date | null;
  sync: () => Promise<void>;
  cancelSync: () => void;
}