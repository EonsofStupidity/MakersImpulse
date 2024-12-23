import { ThemeBase } from './types';

export interface ThemeSyncState {
  lastSynced: string | null;
  isSyncing: boolean;
  error: string | null;
}

export interface ThemeSyncOptions {
  autoSync: boolean;
  syncInterval: number;
  retryOnError: boolean;
  maxRetries: number;
}