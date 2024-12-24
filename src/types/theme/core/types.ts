export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type ThemeInheritanceStrategy = 'merge' | 'override' | 'replace';
export type GlassEffectLevel = 'low' | 'medium' | 'high';

export interface PreviewPreferences {
  real_time_updates: boolean;
  animation_enabled: boolean;
  glass_effect_level: GlassEffectLevel;
  update_debounce_ms: number;
}

export interface ThemeBase {
  colors: {
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
  };
  
  typography: {
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
  };

  spacing: {
    borderRadius: string;
    unit: string;
  };

  effects: {
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
  };

  mode: ThemeMode;
  animations: {
    enabled: boolean;
    defaultDuration: number;
  };
  
  preview: PreviewPreferences;
  inheritance: {
    strategy: ThemeInheritanceStrategy;
    settings: Record<string, any>;
  };
}