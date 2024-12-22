import { z } from 'zod';
import { ThemeMode, TransitionType, GlassEffectLevel } from './core/types';
import { Json } from './core/json';

export const settingsSchema = z.object({
  site_title: z.string(),
  tagline: z.string().optional(),
  primary_color: z.string(),
  secondary_color: z.string(),
  accent_color: z.string(),
  text_primary_color: z.string(),
  text_secondary_color: z.string(),
  text_link_color: z.string(),
  text_heading_color: z.string(),
  neon_cyan: z.string(),
  neon_pink: z.string(),
  neon_purple: z.string(),
  font_family_heading: z.string(),
  font_family_body: z.string(),
  font_size_base: z.string(),
  font_weight_normal: z.string(),
  font_weight_bold: z.string(),
  line_height_base: z.string(),
  letter_spacing: z.string(),
  border_radius: z.string().optional(),
  spacing_unit: z.string().optional(),
  transition_duration: z.string().optional(),
  shadow_color: z.string().optional(),
  hover_scale: z.string().optional(),
  box_shadow: z.string().optional(),
  backdrop_blur: z.string().optional(),
  theme_mode: z.enum(['light', 'dark', 'system'] as const).optional(),
  transition_type: z.enum(['fade', 'slide', 'scale', 'blur'] as const).optional(),
  real_time_toggle: z.boolean().optional(),
  animations_enabled: z.boolean().optional(),
  default_animation_duration: z.number().optional(),
  preview_preferences: z.object({
    real_time_updates: z.boolean(),
    animation_enabled: z.boolean(),
    glass_effect_level: z.enum(['low', 'medium', 'high'] as const),
    update_debounce_ms: z.number()
  }).optional(),
  inheritance_strategy: z.enum(['merge', 'override', 'replace'] as const).optional(),
  inherited_settings: z.record(z.unknown()).transform(val => val as Record<string, Json>).optional()
});

export type ThemeSchema = typeof settingsSchema;