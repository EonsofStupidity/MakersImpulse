import { ThemeBase } from './base';

export interface ThemeFormData extends ThemeBase {
  // Additional form-specific fields can be added here
}

export interface ThemeFormState {
  isDirty: boolean;
  isSubmitting: boolean;
  submitError?: string;
  lastSyncedVersion?: number;
}