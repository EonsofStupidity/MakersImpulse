import { Theme } from './types';

export interface SettingsFormData extends Theme {
  border_radius: string;
  spacing_unit: string;
  transition_duration: string;
  shadow_color: string;
  hover_scale: string;
  box_shadow: string;
  backdrop_blur: string;
  transition_type: TransitionType;
  real_time_toggle?: boolean;
  animations_enabled?: boolean;
  default_animation_duration?: number;
}

export interface ThemeFormState {
  isDirty: boolean;
  isSubmitting: boolean;
  submitError?: string;
  lastSyncedVersion?: number;
}