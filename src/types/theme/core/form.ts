import { ThemeMode, ThemeComponentType, TransitionType } from './types';

export interface SettingsFormData {
  // Basic Settings
  site_title: string;
  tagline?: string;
  
  // Colors
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  
  // Text Colors
  text_primary_color: string;
  text_secondary_color: string;
  text_link_color: string;
  text_heading_color: string;
  
  // Neon Effects
  neon_cyan: string;
  neon_pink: string;
  neon_purple: string;
  
  // Typography
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;
  
  // Layout & Effects
  border_radius?: string;
  spacing_unit?: string;
  transition_duration?: string;
  shadow_color?: string;
  hover_scale?: string;
  box_shadow?: string;
  backdrop_blur?: string;
  
  // Theme Configuration
  theme_mode?: ThemeMode;
  component_type?: ThemeComponentType;
  transition_type?: TransitionType;

  // System Fields
  id?: string;
  updated_at?: string;
  updated_by?: string;
  state_version?: number;
  last_sync?: string;
}

export interface ThemeFormState {
  isDirty: boolean;
  isSubmitting: boolean;
  submitError?: string;
}