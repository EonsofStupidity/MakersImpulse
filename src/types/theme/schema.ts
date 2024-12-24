import { z } from 'zod';
import { ThemeMode, TransitionType, ThemeInheritanceStrategy, GlassEffectLevel } from './core/types';

const previewPreferencesSchema = z.object({
  real_time_updates: z.boolean(),
  animation_enabled: z.boolean(),
  glass_effect_level: z.enum(['low', 'medium', 'high'] as const),
  update_debounce_ms: z.number()
});

// PURE THEME VALIDATION - NO SETTINGS
export const themeSchema = z.object({
  colors: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
    text: z.object({
      primary: z.string(),
      secondary: z.string(),
      link: z.string(),
      heading: z.string()
    }),
    neon: z.object({
      cyan: z.string(),
      pink: z.string(),
      purple: z.string()
    })
  }),
  typography: z.object({
    fontFamily: z.object({
      heading: z.string(),
      body: z.string()
    }),
    fontSize: z.string(),
    fontWeight: z.object({
      normal: z.string(),
      bold: z.string()
    }),
    lineHeight: z.string(),
    letterSpacing: z.string()
  }),
  spacing: z.object({
    borderRadius: z.string(),
    unit: z.string()
  }),
  effects: z.object({
    transition: z.object({
      duration: z.string(),
      type: z.enum(['fade', 'slide', 'scale', 'blur'] as const)
    }),
    shadow: z.object({
      color: z.string(),
      boxShadow: z.string()
    }),
    hover: z.object({
      scale: z.string()
    }),
    backdrop: z.object({
      blur: z.string()
    })
  }),
  animations: z.object({
    enabled: z.boolean(),
    defaultDuration: z.number()
  }),
  preview_preferences: previewPreferencesSchema,
  inheritance_strategy: z.enum(['merge', 'override', 'replace'] as const),
  inherited_settings: z.record(z.any())
});

export type ThemeFormData = z.infer<typeof themeSchema>;