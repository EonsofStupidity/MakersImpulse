import { Json } from './json';

export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type ThemeInheritanceStrategy = 'merge' | 'override' | 'replace';
export type GlassEffectLevel = 'low' | 'medium' | 'high';

export interface ThemePreviewPreferences {
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

export interface ThemeSyncState {
  lastSync: string | null;
  syncStatus: 'idle' | 'syncing' | 'error';
  syncError?: string;
  status?: 'idle' | 'syncing' | 'error';
}

export interface ThemeBase {
  id?: string;
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
  real_time_toggle?: boolean;
  preview_preferences: ThemePreviewPreferences;
  parent_theme_id?: string | null;
  inheritance_strategy?: ThemeInheritanceStrategy;
  inherited_settings?: Json;
  site_title?: string;
  tagline?: string;
  logo_url?: string;
  favicon_url?: string;
  updated_at?: string;
  updated_by?: string;
  created_at?: string;
  created_by?: string;
  animations_enabled: boolean;
  default_animation_duration: number;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: {
      primary: string;
      secondary: string;
      heading: string;
      link: string;
    };
    neon: {
      cyan: string;
      pink: string;
      purple: string;
    };
  };
  typography: {
    fontFamily: {
      heading: string;
      body: string;
    };
    fontSize: {
      base: string;
    };
    fontWeight: {
      normal: string;
      bold: string;
    };
    lineHeight: {
      base: string;
    };
    letterSpacing: string;
  };
  effects: {
    borderRadius: string;
    boxShadow: string;
    backdropBlur: string;
    shadowColor: string;
  };
  spacing: {
    unit: string;
  };
  animations: {
    enabled: boolean;
    duration: number;
  };
}
