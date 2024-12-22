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

// Security settings interface
export interface SecuritySettings {
  ip_blacklist: string[];
  ip_whitelist: string[];
  max_login_attempts: number;
  rate_limit_requests: number;
  session_timeout_minutes: number;
  lockout_duration_minutes: number;
  rate_limit_window_minutes: number;
}

// Font configuration
export interface FontConfig {
  family: string;
  weight: string;
  size: string;
  lineHeight: string;
  letterSpacing: string;
}

// Color configuration
export interface ColorConfig {
  primary: string;
  secondary: string;
  accent: string;
  text: {
    primary: string;
    secondary: string;
    link: string;
    heading: string;
  };
  neon: {
    cyan: string;
    pink: string;
    purple: string;
  };
}

// Animation configuration
export interface AnimationConfig {
  enabled: boolean;
  duration: number;
  type: TransitionType;
}

// The core theme interface - used for runtime operations
export interface ThemeBase {
  id?: string;
  site_title: string;
  tagline: string;
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
  theme_mode: ThemeMode;
  transition_type: TransitionType;
  component_type?: ThemeComponentType;
  real_time_toggle: boolean;
  animations_enabled: boolean;
  default_animation_duration: number;
  preview_preferences: PreviewPreferences;
  parent_theme_id?: string;
  inheritance_strategy: ThemeInheritanceStrategy;
  inherited_settings: Json;
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
export interface ThemeFormData extends ThemeBase {
  state_version?: number;
  last_sync?: string;
}

// Response type for theme-related API calls
export interface ThemeResponse extends ThemeBase {
  state_version?: number;
  last_sync?: string;
}

// Type aliases for different use cases
export type Theme = ThemeBase;
export type Settings = ThemeBase;
export type SettingsResponse = ThemeResponse;
export type SettingsFormData = ThemeFormData;
export type DatabaseSettingsRow = ThemeConfigurationRow;

// Schema validation type
export const settingsSchema = {
  // Will be implemented when we handle validation
} as const;

// Re-export Json type for convenience
export type { Json } from './database/json';