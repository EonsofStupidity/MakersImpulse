import { Json } from '@/types/core/json';

// Theme enums with strict typing
export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeComponentType = 'color' | 'typography' | 'layout' | 'animation' | 'effect';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type ThemeInheritanceStrategy = 'merge' | 'override' | 'replace';
export type GlassEffectLevel = 'low' | 'medium' | 'high';

// Preview preferences with proper JSON typing
export interface PreviewPreferences extends Record<string, Json> {
  real_time_updates: boolean;
  animation_enabled: boolean;
  glass_effect_level: GlassEffectLevel;
  update_debounce_ms: number;
}

// Base theme interface with strict typing and proper JSON extension
export interface ThemeBase {
  // Required core properties
  site_title: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  text_primary_color: string;
  text_secondary_color: string;
  text_link_color: string;
  text_heading_color: string;
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;
  theme_mode: ThemeMode;
  transition_type: TransitionType;
  real_time_toggle: boolean;
  animations_enabled: boolean;
  default_animation_duration: number;
  preview_preferences: PreviewPreferences;
  inheritance_strategy: ThemeInheritanceStrategy;
  inherited_settings: Record<string, Json>;

  // Optional properties
  id?: string;
  tagline?: string;
  border_radius?: string;
  spacing_unit?: string;
  transition_duration?: string;
  shadow_color?: string;
  hover_scale?: string;
  box_shadow?: string;
  backdrop_blur?: string;
  component_type?: ThemeComponentType;
  parent_theme_id?: string;
  logo_url?: string;
  favicon_url?: string;
  updated_at?: string;
  updated_by?: string;
  neon_cyan?: string;
  neon_pink?: string;
  neon_purple?: string;
  menu_animation_type?: 'fade' | 'slide-down' | 'scale' | 'blur';

  // Allow additional string-indexed properties
  [key: string]: Json | undefined;
}

// Database row type with additional fields
export interface ThemeConfigurationRow extends ThemeBase {
  state_version: number;
  last_sync: string;
}

// Form data type
export type ThemeFormData = ThemeBase;

// Utility type for partial theme updates
export type PartialTheme = Partial<ThemeBase>;