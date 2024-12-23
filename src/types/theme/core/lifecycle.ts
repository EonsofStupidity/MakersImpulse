import { ThemeBase } from './types';

export interface ThemeLifecycleHooks {
  onInit?: (theme: ThemeBase) => void | Promise<void>;
  onUpdate?: (oldTheme: ThemeBase, newTheme: ThemeBase) => void | Promise<void>;
  onError?: (error: Error, theme: ThemeBase) => void | Promise<void>;
  onDestroy?: (theme: ThemeBase) => void | Promise<void>;
}

export interface ThemeLifecycleState {
  isInitialized: boolean;
  isUpdating: boolean;
  error: Error | null;
}