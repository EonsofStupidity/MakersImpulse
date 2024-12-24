import { Json } from '@/types/core/json';

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

export interface ThemeValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface ThemeValidationResult {
  isValid: boolean;
  errors: ThemeValidationError[];
}

export interface ThemeLifecycleState {
  status: 'initializing' | 'ready' | 'error' | 'deactivating';
  error?: string;
}

export interface ThemeSyncState {
  status: 'pending' | 'syncing' | 'completed' | 'error';
  last_sync: string;
  error?: string;
}

export interface ThemeBase extends Record<string, any> {
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
  inherited_settings: Record<string, Json>;
  logo_url?: string;
  favicon_url?: string;
  updated_at?: string;
  updated_by?: string;
}

export interface ThemeConfigurationRow extends ThemeBase {
  state_version: number;
  last_sync: string;
}

export type ThemeFormData = ThemeBase;
export type SettingsFormData = ThemeBase;
export type Settings = ThemeBase;
export type Theme = ThemeBase;

export interface SettingsResponse<T = any> {
  id: string;
  value: T;
}

export interface AuthUser {
  id: string;
  email: string;
  displayName?: string;
  bio?: string;
  website?: string;
  location?: string;
  created_at?: string;
  role?: 'subscriber' | 'maker' | 'admin' | 'super_admin';
}