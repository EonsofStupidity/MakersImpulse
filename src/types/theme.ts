import { Json } from "./database/json";

// Core theme enums
export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeComponentType = 'color' | 'typography' | 'layout' | 'animation' | 'effect';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type ThemeInheritanceStrategy = 'merge' | 'override' | 'replace';
export type GlassEffectLevel = 'low' | 'medium' | 'high';

// Preview preferences interface
export interface PreviewPreferences {
  real_time_updates: boolean;
  animation_enabled: boolean;
  glass_effect_level: GlassEffectLevel;
  update_debounce_ms: number;
}

// The core theme interface - used for runtime operations
export interface ThemeBase {
  // Required Visual Identity Properties
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  
  // Required Typography Properties
  text_primary_color: string;
  text_secondary_color: string;
  text_heading_color: string;
  text_link_color: string;
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;
  
  // Required Layout Properties
  border_radius: string;
  spacing_unit: string;
  transition_duration: string;
  
  // Required Animation Properties
  animations_enabled: boolean;
  transition_type: TransitionType;
  default_animation_duration: number;
  
  // Optional Properties with defaults
  id?: string;
  site_title: string;
  tagline?: string;
  
  // Optional Advanced Styling
  shadow_color?: string;
  hover_scale?: string;
  box_shadow?: string;
  backdrop_blur?: string;
  neon_cyan?: string;
  neon_pink?: string;
  neon_purple?: string;
  
  // Optional Theme Configuration
  theme_mode?: ThemeMode;
  component_type?: ThemeComponentType;
  real_time_toggle?: boolean;
  preview_preferences: PreviewPreferences;
  
  // Optional Inheritance Properties
  parent_theme_id?: string;
  inheritance_strategy: ThemeInheritanceStrategy;
  inherited_settings: Json;
  
  // Optional Metadata
  logo_url?: string;
  favicon_url?: string;
  updated_at?: string;
  updated_by?: string;
}

// Database row type - used for database operations
export interface ThemeConfigurationRow extends Omit<ThemeBase, 'preview_preferences' | 'inherited_settings'> {
  preview_preferences: Json;
  inherited_settings: Json;
  state_version?: number;
  last_sync?: string;
}

// Form data type - used for form operations
export type ThemeFormData = ThemeBase;

// Response type for theme-related API calls
export type ThemeResponse = ThemeBase;

// Type aliases for different use cases
export type Theme = ThemeBase;
export type Settings = ThemeBase;
export type SettingsResponse = ThemeResponse;
export type SettingsFormData = ThemeFormData;
export type DatabaseSettingsRow = ThemeConfigurationRow;

// Re-export Json type for convenience
export type { Json } from './database/json';