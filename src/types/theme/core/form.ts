import { Theme, TransitionType } from './types';

export interface ThemeFormState {
  isDirty: boolean;
  isSubmitting: boolean;
  submitError?: string;
  lastSyncedVersion?: number;
}

export type { ThemeFormData } from './types';