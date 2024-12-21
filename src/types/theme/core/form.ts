import { ThemeBase, TransitionType, ThemeInheritanceStrategy, PreviewPreferences } from './types';

// Single unified form data type that extends ThemeBase
export interface ThemeFormData extends ThemeBase {
  border_radius: string;
  spacing_unit: string;
  transition_duration: string;
  shadow_color: string;
  hover_scale: string;
  box_shadow: string;
  backdrop_blur: string;
  transition_type: TransitionType;
  parent_theme_id?: string;
  inheritance_strategy?: ThemeInheritanceStrategy;
  real_time_toggle?: boolean;
  animations_enabled?: boolean;
  default_animation_duration?: number;
  preview_preferences?: PreviewPreferences;
}

// For backward compatibility and to avoid breaking existing code,
// we'll export SettingsFormData as an alias of ThemeFormData
export type SettingsFormData = ThemeFormData;