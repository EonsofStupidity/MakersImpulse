import { Json } from '@/types/core/json';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeComponentType = 'color' | 'typography' | 'layout' | 'animation' | 'effect';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type ThemeInheritanceStrategy = 'merge' | 'override' | 'replace';
export type GlassEffectLevel = 'low' | 'medium' | 'high';
export type CSSUnit = 'px' | 'rem' | 'em' | 'vh' | 'vw' | '%';
export type CSSValue = `${number}${CSSUnit}` | 'auto' | 'none' | 'inherit';
export type UserRole = 'admin' | 'super_admin' | 'subscriber' | 'maker';

export interface PreviewPreferences {
  real_time_updates: boolean;
  animation_enabled: boolean;
  glass_effect_level: GlassEffectLevel;
  update_debounce_ms: number;
}

export interface ThemeBase {
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

export interface ThemeLifecycleState {
  status: 'initial' | 'loading' | 'ready' | 'syncing' | 'error';
  error?: string;
  lastSync?: string;
}

export interface ThemeSyncState {
  isSyncing: boolean;
  lastSyncTime?: string;
  error?: string;
}

export interface ThemeValidationError {
  field: keyof ThemeBase | string;
  message: string;
  code: string;
  path?: string[];
}

export interface ThemeValidationRule {
  field: keyof ThemeBase | string;
  validate: (value: any) => boolean;
  message: string;
  code: string;
}

export interface ThemeValidationResult {
  isValid: boolean;
  errors: ThemeValidationError[];
}

export interface Settings extends ThemeBase {
  id: string;
  created_at?: string;
}

export interface SettingsFormData extends ThemeBase {
  // Form-specific fields that extend ThemeBase
}

export interface SettingsResponse {
  data: Settings;
  error: null | Error;
}

export interface ThemeConfigurationRow extends ThemeBase {
  id: string;
  created_at: string;
  state_version: number;
  last_sync: string;
}

export interface ThemeConfiguration extends ThemeConfigurationRow {
  preview_preferences: PreviewPreferences & Record<string, Json>;
}

export type Theme = ThemeBase;