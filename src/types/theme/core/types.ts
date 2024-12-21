// Basic type enums that match our database exactly
export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeComponentType = 'color' | 'typography' | 'layout' | 'animation' | 'effect';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type ThemeInheritanceStrategy = 'merge' | 'override' | 'replace';
export type GlassEffectLevel = 'low' | 'medium' | 'high';

// Preview preferences exactly matching our jsonb structure
export interface PreviewPreferences {
  real_time_updates: boolean;
  animation_enabled: boolean;
  glass_effect_level: GlassEffectLevel;
  update_debounce_ms: number;
}

// Core theme interface matching Supabase theme_configuration table exactly
export interface ThemeBase {
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
  real_time_toggle: boolean;
  animations_enabled: boolean;
  default_animation_duration: number;
  preview_preferences: PreviewPreferences;
  parent_theme_id?: string;
  inheritance_strategy: ThemeInheritanceStrategy;
  inherited_settings: Record<string, unknown>;
  logo_url?: string;
  favicon_url?: string;
  updated_at?: string;
  updated_by?: string;
  state_version?: number;
  last_sync?: string;
}

// Database-specific type that handles JSON serialization
export interface DatabaseThemeRow extends ThemeBase {
  id: string;
  preview_preferences: string; // JSON string in DB
  inherited_settings: string; // JSON string in DB
}

// Form-specific type that extends ThemeBase
export interface ThemeFormData extends ThemeBase {
  // Form-specific fields can be added here
}

// Settings response type
export interface ThemeResponse extends ThemeBase {
  // Response-specific fields can be added here
}