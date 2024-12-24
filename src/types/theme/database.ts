import { Json } from '../core/json';

// Exact match to Supabase schema
export interface ThemeRow {
  id: string;
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
  border_radius: string;
  spacing_unit: string;
  transition_duration: string;
  shadow_color: string;
  hover_scale: string;
  box_shadow: string;
  backdrop_blur: string;
  theme_mode: 'light' | 'dark' | 'system';
  transition_type: 'fade' | 'slide' | 'scale' | 'blur';
  real_time_toggle: boolean;
  animations_enabled: boolean;
  default_animation_duration: number;
  preview_preferences: Json;
  parent_theme_id?: string;
  inheritance_strategy: 'merge' | 'override' | 'replace';
  inherited_settings: Json;
  created_at?: string;
  updated_at?: string;
}

// Type guard for ThemeRow
export const isThemeRow = (value: unknown): value is ThemeRow => {
  if (!value || typeof value !== 'object') return false;
  const row = value as Partial<ThemeRow>;
  return (
    typeof row.site_title === 'string' &&
    typeof row.primary_color === 'string'
    // Add more checks as needed
  );
};