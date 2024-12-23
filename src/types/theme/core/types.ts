import { Json, JsonObject } from '@/types/core/json';

// Core enums
export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeComponentType = 'color' | 'typography' | 'layout' | 'animation' | 'effect';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type ThemeInheritanceStrategy = 'merge' | 'override' | 'replace';
export type GlassEffectLevel = 'low' | 'medium' | 'high';

// Preview preferences
export interface PreviewPreferences extends Record<string, Json> {
  real_time_updates: boolean;
  animation_enabled: boolean;
  glass_effect_level: GlassEffectLevel;
  update_debounce_ms: number;
}

// Base theme interface with index signature
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
  menu_animation_type?: 'fade' | 'slide-down' | 'scale' | 'blur';
  [key: string]: any; // Index signature for additional properties
}

// Theme update payload type
export interface ThemeUpdatePayload {
  p_site_title: string;
  p_tagline: string;
  p_primary_color: string;
  p_secondary_color: string;
  p_accent_color: string;
  p_text_primary_color: string;
  p_text_secondary_color: string;
  p_text_link_color: string;
  p_text_heading_color: string;
  p_neon_cyan: string;
  p_neon_pink: string;
  p_neon_purple: string;
  p_font_family_heading: string;
  p_font_family_body: string;
  p_font_size_base: string;
  p_font_weight_normal: string;
  p_font_weight_bold: string;
  p_line_height_base: string;
  p_letter_spacing: string;
  p_border_radius: string;
  p_spacing_unit: string;
  p_transition_duration: string;
  p_shadow_color: string;
  p_hover_scale: string;
}

// Theme lifecycle types
export type ThemeLifecycleState = 'initializing' | 'active' | 'error' | 'cleanup' | 'deactivating';

export interface ThemeLifecycleOptions {
  autoInit?: boolean;
  onInit?: () => void;
  onError?: (error: Error) => void;
}

// Theme sync types
export interface ThemeSyncState {
  isSyncing: boolean;
  lastSyncedAt: Date | null;
  error: Error | null;
  last_sync?: string;
  sync_status?: 'pending' | 'syncing' | 'completed' | 'error';
}

export interface ThemeSyncOptions {
  syncInterval?: number;
  retryAttempts?: number;
  onSync?: () => void;
  onError?: (error: Error) => void;
  debounce_ms?: number;
}

// Theme validation types
export interface ThemeValidationError {
  field: string;
  message: string;
}

export interface ThemeValidationResult {
  isValid: boolean;
  errors: ThemeValidationError[];
}

export interface ThemeValidationRule {
  field: keyof ThemeBase;
  validator: (value: any) => boolean;
  message: string;
}

// Database row type
export interface ThemeConfigurationRow extends ThemeBase {
  state_version: number;
  last_sync: string;
}

// Utility types
export type PartialTheme = Partial<ThemeBase>;
export type ThemeFormData = ThemeBase;
export type Theme = ThemeBase;