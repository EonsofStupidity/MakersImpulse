import { Json } from "../database/json";

export type SettingType = 'theme' | 'security' | 'content' | 'system' | 'user' | 'notification' | 'workflow';

export type GlassEffectLevel = 'low' | 'medium' | 'high';
export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type ThemeInheritanceStrategy = 'merge' | 'override' | 'replace';

export interface PreviewPreferences {
  real_time_updates: boolean;
  animation_enabled: boolean;
  glass_effect_level: GlassEffectLevel;
  update_debounce_ms: number;
}

export interface ThemeSettings {
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
  real_time_toggle: boolean;
  animations_enabled: boolean;
  default_animation_duration: number;
  preview_preferences: PreviewPreferences;
  parent_theme_id?: string;
  inheritance_strategy: ThemeInheritanceStrategy;
  inherited_settings: Record<string, unknown>;
  logo_url?: string;
  favicon_url?: string;
}

export interface SecuritySettings {
  ip_blacklist: string[];
  ip_whitelist: string[];
  max_login_attempts: number;
  rate_limit_requests: number;
  session_timeout_minutes: number;
  lockout_duration_minutes: number;
  rate_limit_window_minutes: number;
}

export interface UnifiedSetting<T = any> {
  id: string;
  category: SettingType;
  key: string;
  value: T;
  metadata?: Record<string, unknown>;
  is_encrypted: boolean;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}

export interface SettingsResponse<T = any> {
  data: UnifiedSetting<T> | null;
  error: Error | null;
}

export const DEFAULT_THEME_SETTINGS: ThemeSettings = {
  site_title: 'MakersImpulse',
  tagline: 'Create, Share, Inspire',
  primary_color: '#7FFFD4',
  secondary_color: '#FFB6C1',
  accent_color: '#E6E6FA',
  text_primary_color: '#FFFFFF',
  text_secondary_color: '#A1A1AA',
  text_link_color: '#3B82F6',
  text_heading_color: '#FFFFFF',
  neon_cyan: '#41f0db',
  neon_pink: '#ff0abe',
  neon_purple: '#8000ff',
  font_family_heading: 'Inter',
  font_family_body: 'Inter',
  font_size_base: '16px',
  font_weight_normal: '400',
  font_weight_bold: '700',
  line_height_base: '1.5',
  letter_spacing: 'normal',
  border_radius: '0.5rem',
  spacing_unit: '1rem',
  transition_duration: '0.3s',
  shadow_color: '#000000',
  hover_scale: '1.05',
  box_shadow: 'none',
  backdrop_blur: '0',
  theme_mode: 'dark',
  transition_type: 'fade',
  real_time_toggle: true,
  animations_enabled: true,
  default_animation_duration: 300,
  preview_preferences: {
    real_time_updates: true,
    animation_enabled: true,
    glass_effect_level: 'medium',
    update_debounce_ms: 100
  },
  inheritance_strategy: 'merge',
  inherited_settings: {}
};