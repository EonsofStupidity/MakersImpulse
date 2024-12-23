import { Json } from '@/types/core/json';

// Core enums
export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeComponentType = 'color' | 'typography' | 'layout' | 'animation' | 'effect';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type ThemeInheritanceStrategy = 'merge' | 'override' | 'replace';
export type GlassEffectLevel = 'low' | 'medium' | 'high';

export interface PreviewPreferences extends Record<string, Json> {
  real_time_updates: boolean;
  animation_enabled: boolean;
  glass_effect_level: GlassEffectLevel;
  update_debounce_ms: number;
}

export interface ThemeBase {
  // Required fields
  site_title: string;
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;
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

  // Optional fields
  id?: string;
  tagline?: string;
  border_radius?: string;
  spacing_unit?: string;
  shadow_color?: string;
  hover_scale?: string;
  transition_duration?: string;
  logo_url?: string;
  favicon_url?: string;
  box_shadow?: string;
  backdrop_blur?: string;
  theme_mode?: ThemeMode;
  transition_type?: TransitionType;
  component_type?: ThemeComponentType;
  inheritance_strategy?: ThemeInheritanceStrategy;
  real_time_toggle?: boolean;
  animations_enabled?: boolean;
  default_animation_duration?: number;
  preview_preferences?: PreviewPreferences;
  inherited_settings?: Record<string, Json>;
  updated_at?: string;
  updated_by?: string;
  menu_animation_type?: 'fade' | 'slide-down' | 'scale' | 'blur';
  parent_theme_id?: string;

  [key: string]: any;
}

export interface ThemeConfigurationRow extends ThemeBase {
  state_version: number;
  last_sync: string;
}

// Lifecycle and validation types
export type ThemeLifecycleState = 'initializing' | 'active' | 'deactivating' | 'cleanup';
export type ThemeSyncState = 'pending' | 'syncing' | 'completed' | 'error';

export interface ThemeLifecycleOptions {
  autoSync?: boolean;
  syncInterval?: number;
}

export interface ThemeSyncOptions {
  force?: boolean;
  timeout?: number;
  debounce_ms?: number;
}

export interface ThemeValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ThemeValidationResult {
  isValid: boolean;
  errors: ThemeValidationError[];
}

export interface ThemeValidationRule {
  field: string;
  validator: (value: any) => boolean;
  message: string;
}

// Type aliases
export type PartialTheme = Partial<ThemeBase>;
export type ThemeFormData = ThemeBase;
export type Theme = ThemeBase;