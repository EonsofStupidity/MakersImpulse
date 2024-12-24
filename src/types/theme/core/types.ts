import { Json } from '@/types/core/json';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeComponentType = 'color' | 'typography' | 'layout' | 'animation' | 'effect';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type ThemeInheritanceStrategy = 'merge' | 'override' | 'replace';
export type GlassEffectLevel = 'low' | 'medium' | 'high';
export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export type CSSValue = string;
export type CSSUnit = 'px' | 'rem' | 'em' | 'vh' | 'vw' | '%' | '';

export interface PreviewPreferences {
  real_time_updates: boolean;
  animation_enabled: boolean;
  glass_effect_level: GlassEffectLevel;
  update_debounce_ms: number;
  [key: string]: boolean | string | number;
}

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
  font_size_base: CSSValue;
  font_weight_normal: CSSValue;
  font_weight_bold: CSSValue;
  line_height_base: CSSValue;
  letter_spacing: CSSValue;
  border_radius: CSSValue;
  spacing_unit: CSSValue;
  transition_duration: CSSValue;
  shadow_color: string;
  hover_scale: CSSValue;
  box_shadow: string;
  backdrop_blur: CSSValue;
  theme_mode: ThemeMode;
  transition_type: TransitionType;
  component_type?: ThemeComponentType;
  real_time_toggle: boolean;
  animations_enabled: boolean;
  default_animation_duration: number;
  preview_preferences: PreviewPreferences & Record<string, Json>;
  parent_theme_id?: string;
  inheritance_strategy: ThemeInheritanceStrategy;
  inherited_settings: Record<string, Json>;
  logo_url?: string;
  favicon_url?: string;
  updated_at?: string;
  updated_by?: string;
  [key: string]: Json | undefined;
}

export interface ThemeConfigurationRow extends ThemeBase {
  state_version: number;
  last_sync: string;
}

export interface ThemeLifecycleState {
  status: 'initializing' | 'ready' | 'error' | 'deactivating';
  error?: string;
}

export type ThemeFormData = ThemeBase;
export type Settings = ThemeBase;
export type Theme = ThemeBase;