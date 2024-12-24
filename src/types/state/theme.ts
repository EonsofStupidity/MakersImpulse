import { ThemeRow } from '../database/theme';

export interface ThemeState extends Omit<ThemeRow, 'created_at' | 'updated_at'> {
  isDirty: boolean;
  lastSync: Date | null;
  syncStatus: 'idle' | 'syncing' | 'error';
  syncError?: string;
  isPreviewMode: boolean;
  localChanges: Partial<ThemeRow>;
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