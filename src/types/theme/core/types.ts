export type ThemeMode = 'light' | 'dark' | 'system';

export type ThemeComponentType = 
  | 'color'
  | 'typography'
  | 'layout'
  | 'animation'
  | 'effect';

export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';

export interface Settings extends ThemeBase {
  preview_preferences?: {
    real_time_updates: boolean;
    animation_enabled: boolean;
    glass_effect_level: 'low' | 'medium' | 'high';
    update_debounce_ms: number;
  };
}

export type { ThemeBase } from './base';