import { ThemeBase } from './base';

export interface ThemeFormData extends ThemeBase {
  // Form-specific fields
  border_radius: string;
  spacing_unit: string;
  transition_duration: string;
  shadow_color: string;
  hover_scale: string;
  box_shadow: string;
  backdrop_blur: string;
  transition_type: 'fade' | 'slide' | 'scale' | 'blur';
}

export interface ThemeFormState {
  isDirty: boolean;
  isSubmitting: boolean;
  submitError?: string;
  lastSyncedVersion?: number;
}