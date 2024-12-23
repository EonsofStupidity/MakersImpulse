import { ThemeBase, ThemeSyncState, ThemeSyncOptions } from './types';

export interface ThemeSyncHook {
  state: ThemeSyncState;
  lastSync: Date | null;
  sync: () => Promise<void>;
  cancelSync: () => void;
}

export const createThemeSync = (options: ThemeSyncOptions = {}): ThemeSyncHook => {
  return {
    state: 'idle',
    lastSync: null,
    sync: async () => {},
    cancelSync: () => {}
  };
};