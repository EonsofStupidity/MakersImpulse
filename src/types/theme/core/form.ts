import { ThemeBase } from './base';

export interface ThemeFormData extends ThemeBase {
  // Make optional fields required for the form
  border_radius: string;
  spacing_unit: string;
  transition_duration: string;
  shadow_color: string;
  hover_scale: string;
  box_shadow: string;
  backdrop_blur: string;
  transition_type: string;
}

export interface ThemeFormState {
  isDirty: boolean;
  isSubmitting: boolean;
  submitError?: string;
  lastSyncedVersion?: number;
}