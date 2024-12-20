import { ThemeBase } from './base';

export interface ThemeContextType {
  theme: ThemeBase;
  updateTheme: (theme: Partial<ThemeBase>) => Promise<void>;
  previewPreferences: {
    real_time_updates: boolean;
    animation_enabled: boolean;
    glass_effect_level: 'low' | 'medium' | 'high';
    update_debounce_ms: number;
  };
}