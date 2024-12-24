export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type ThemeInheritanceStrategy = 'merge' | 'override' | 'replace';
export type GlassEffectLevel = 'low' | 'medium' | 'high';
export type ThemeComponentType = 'color' | 'typography' | 'layout' | 'animation' | 'effect';

export interface PreviewPreferences {
  real_time_updates: boolean;
  animation_enabled: boolean;
  glass_effect_level: GlassEffectLevel;
  update_debounce_ms: number;
}

export interface ThemeColors {
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

export interface ThemeTypography {
  fontFamily: {
    heading: string;
    body: string;
  };
  fontSize: string;
  fontWeight: {
    normal: string;
    bold: string;
  };
  lineHeight: string;
  letterSpacing: string;
}

export interface ThemeSpacing {
  borderRadius: string;
  unit: string;
}

export interface ThemeEffects {
  transition: {
    duration: string;
    type: TransitionType;
  };
  shadow: {
    color: string;
    boxShadow: string;
  };
  hover: {
    scale: string;
  };
  backdrop: {
    blur: string;
  };
}

export interface ThemeAnimations {
  enabled: boolean;
  defaultDuration: number;
}

export interface ThemeBase {
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  effects: ThemeEffects;
  animations: ThemeAnimations;
  preview_preferences: PreviewPreferences;
  inheritance_strategy: ThemeInheritanceStrategy;
  inherited_settings: Record<string, any>;
}

// Separate Settings interface for non-visual configuration
export interface Settings {
  site_title: string;
  tagline?: string;
  logo_url?: string;
  favicon_url?: string;
  theme_mode?: ThemeMode;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
  metadata?: Record<string, any>;
}