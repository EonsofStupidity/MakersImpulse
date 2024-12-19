export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';

export interface TransitionConfig {
  duration: string;
  type: TransitionType;
}

export interface ShadowConfig {
  color: string;
  boxShadow?: string;
  backdropBlur?: string;
}

export interface ThemeEffects {
  borderRadius: string;
  spacing: string;
  transitions: TransitionConfig;
  shadows: ShadowConfig;
  hoverScale: string;
}