import { ThemeSyncState } from './types';

export interface ThemeSyncOptions {
  debounce_ms?: number;
  onSync?: () => void;
  onError?: (error: Error) => void;
}

export type { ThemeSyncState };