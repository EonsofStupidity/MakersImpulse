import { ThemeLifecycleState } from './types';

export interface ThemeLifecycleOptions {
  onInit?: () => void;
  onError?: (error: Error) => void;
}

export type { ThemeLifecycleState };