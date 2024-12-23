import { ThemeBase } from './types';

export type ThemeLifecycleState = 'initializing' | 'ready' | 'updating' | 'error';

export interface ThemeLifecycleOptions {
  autoSync?: boolean;
  syncInterval?: number;
  onStateChange?: (state: ThemeLifecycleState) => void;
}

export interface ThemeLifecycleHook {
  state: ThemeLifecycleState;
  initialize: () => Promise<void>;
  update: (theme: Partial<ThemeBase>) => Promise<void>;
  cleanup: () => void;
}