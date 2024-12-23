import { Json } from '@/types/core/json';

// Core enums
export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeComponentType = 'color' | 'typography' | 'layout' | 'animation' | 'effect';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type ThemeInheritanceStrategy = 'merge' | 'override' | 'replace';
export type GlassEffectLevel = 'low' | 'medium' | 'high';

// Preview preferences with index signature
export interface PreviewPreferences {
  real_time_updates: boolean;
  animation_enabled: boolean;
  glass_effect_level: GlassEffectLevel;
  update_debounce_ms: number;
  [key: string]: Json;
}

// Main theme interface with strict typing and index signature
export interface ThemeBase {
  // Required fields (NOT NULL in DB)
  site_title: string;
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;

  // Optional fields (NULLABLE in DB)
  id?: string;
  tagline?: string;
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  text_primary_color?: string;
  text_secondary_color?: string;
  text_link_color?: string;
  text_heading_color?: string;
  border_radius?: string;
  spacing_unit?: string;
  shadow_color?: string;
  hover_scale?: string;
  transition_duration?: string;
  logo_url?: string;
  favicon_url?: string;
  neon_cyan?: string;
  neon_pink?: string;
  neon_purple?: string;
  box_shadow?: string;
  backdrop_blur?: string;
  
  // Enum fields
  theme_mode?: ThemeMode;
  transition_type?: TransitionType;
  component_type?: ThemeComponentType;
  inheritance_strategy?: ThemeInheritanceStrategy;

  // Boolean fields
  real_time_toggle?: boolean;
  animations_enabled?: boolean;
  
  // Number fields
  default_animation_duration?: number;
  
  // Complex fields
  preview_preferences?: PreviewPreferences;
  inherited_settings?: Record<string, Json>;
  
  // Additional fields
  updated_at?: string;
  updated_by?: string;
  menu_animation_type?: 'fade' | 'slide-down' | 'scale' | 'blur';
  parent_theme_id?: string;

  // Index signature for partial updates and additional properties
  [key: string]: any;
}

// Database row type with additional fields
export interface ThemeConfigurationRow extends ThemeBase {
  state_version: number;
  last_sync: string;
}

// Utility types
export type PartialTheme = Partial<ThemeBase>;
export type ThemeFormData = ThemeBase;
export type Theme = ThemeBase;