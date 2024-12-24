import { ThemeBase } from '../core/types';

export interface ThemeState extends ThemeBase {
  // ONLY state management properties
  isDirty: boolean;
  lastSync: Date | null;
  syncStatus: 'idle' | 'syncing' | 'error';
  syncError?: string;
  isPreviewMode: boolean;
  localChanges: Partial<ThemeBase>;
}

export interface ThemeStore {
  theme: ThemeState | null;
  setTheme: (theme: ThemeState) => void;
  updateTheme: (updates: Partial<ThemeState>) => void;
  resetTheme: () => void;
  syncTheme: () => Promise<void>;
}

export interface ThemeSyncState {
  status: 'pending' | 'syncing' | 'completed' | 'error';
  last_sync?: string;
  error?: string;
}