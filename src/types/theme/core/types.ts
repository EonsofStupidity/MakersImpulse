export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type ThemeInheritanceStrategy = 'merge' | 'override' | 'replace';
export type GlassEffectLevel = 'low' | 'medium' | 'high';

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

export interface PreviewPreferences {
  real_time_updates: boolean;
  animation_enabled: boolean;
  glass_effect_level: GlassEffectLevel;
  update_debounce_ms: number;
}

// PURE THEME - NO SETTINGS CONTAMINATION
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