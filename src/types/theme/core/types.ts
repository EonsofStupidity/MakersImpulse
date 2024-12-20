export type ThemeMode = 'light' | 'dark' | 'system';

export type ThemeComponentType = 
  | 'color'
  | 'typography'
  | 'layout'
  | 'animation'
  | 'effect';

export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';

export interface ThemeBase {
  id?: string;
  site_title: string;  // Required
  tagline?: string;
  primary_color: string;  // Has default
  secondary_color: string;  // Has default
  accent_color: string;  // Has default
  text_primary_color: string;  // Has default
  text_secondary_color: string;  // Has default
  text_link_color: string;  // Has default
  text_heading_color: string;  // Has default
  neon_cyan: string;  // Has default
  neon_pink: string;  // Has default
  neon_purple: string;  // Has default
  font_family_heading: string;  // Required
  font_family_body: string;  // Required
  font_size_base: string;  // Required
  font_weight_normal: string;  // Required
  font_weight_bold: string;  // Required
  line_height_base: string;  // Required
  letter_spacing: string;  // Required
  border_radius?: string;
  spacing_unit?: string;
  transition_duration?: string;
  shadow_color?: string;
  hover_scale?: string;
  box_shadow?: string;
  backdrop_blur?: string;
  transition_type?: TransitionType;
  theme_mode?: ThemeMode;
  component_type?: ThemeComponentType;
  logo_url?: string;
  favicon_url?: string;
  updated_at?: string;
  updated_by?: string;
  state_version?: number;  // Added to match DB
  last_sync?: string;  // Added to match DB
}