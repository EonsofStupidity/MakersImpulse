import { ThemeBase, ThemeLifecycleState, ThemeLifecycleOptions } from './types';

export interface ThemeLifecycleHook {
  state: ThemeLifecycleState;
  initialize: () => Promise<void>;
  update: (theme: Partial<ThemeBase>) => Promise<void>;
  cleanup: () => void;
}

export const createThemeLifecycle = (options: ThemeLifecycleOptions = {}): ThemeLifecycleHook => {
  return {
    state: 'initializing',
    initialize: async () => {},
    update: async () => {},
    cleanup: () => {}
  };
};