import { ThemeMode, ThemeComponentType, TransitionType, ThemeBase } from './types';

export type SettingsFormData = ThemeBase;

export interface ThemeFormState {
  isDirty: boolean;
  isSubmitting: boolean;
  submitError?: string;
}