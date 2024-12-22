import { Json } from '../core/json';
import { ThemeMode, ThemeComponentType, TransitionType, ThemeInheritanceStrategy, PreviewPreferences } from './core/types';

// Matches exactly with database schema
export interface ThemeConfiguration {
  id?: string;
  site_title: string;
  tagline?: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  text_primary_color: string;
  text_secondary_color: string;
  text_link_color: string;
  text_heading_color: string;
  neon_cyan: string;
  neon_pink: string;
  neon_purple: string;
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;
  border_radius?: string;
  spacing_unit?: string;
  transition_duration?: string;
  shadow_color?: string;
  hover_scale?: string;
  box_shadow?: string;
  backdrop_blur?: string;
  theme_mode?: ThemeMode;
  transition_type?: TransitionType;
  component_type?: ThemeComponentType;
  real_time_toggle?: boolean;
  animations_enabled?: boolean;
  default_animation_duration?: number;
  preview_preferences?: PreviewPreferences;
  parent_theme_id?: string;
  inheritance_strategy?: ThemeInheritanceStrategy;
  inherited_settings?: Record<string, Json>;
  logo_url?: string;
  favicon_url?: string;
  updated_at?: string;
  updated_by?: string;
  state_version?: number;
  last_sync?: string;
}