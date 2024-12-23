import { z } from 'zod';
import { ThemeMode, TransitionType, GlassEffectLevel, ThemeInheritanceStrategy } from './core/types';

export const previewPreferencesSchema = z.object({
  real_time_updates: z.boolean(),
  animation_enabled: z.boolean(),
  glass_effect_level: z.enum(['low', 'medium', 'high'] as const),
  update_debounce_ms: z.number().min(0).max(1000)
}).catchall(z.any());

export const themeSchema = z.object({
  site_title: z.string(),
  tagline: z.string().optional(),
  primary_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  secondary_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  accent_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  text_primary_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  text_secondary_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  text_link_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  text_heading_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  neon_cyan: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  neon_pink: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  neon_purple: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  font_family_heading: z.string(),
  font_family_body: z.string(),
  font_size_base: z.string(),
  font_weight_normal: z.string(),
  font_weight_bold: z.string(),
  line_height_base: z.string(),
  letter_spacing: z.string(),
  border_radius: z.string(),
  spacing_unit: z.string(),
  transition_duration: z.string(),
  shadow_color: z.string(),
  hover_scale: z.string(),
  box_shadow: z.string(),
  backdrop_blur: z.string(),
  theme_mode: z.enum(['light', 'dark', 'system'] as const),
  transition_type: z.enum(['fade', 'slide', 'scale', 'blur'] as const),
  real_time_toggle: z.boolean(),
  animations_enabled: z.boolean(),
  default_animation_duration: z.number(),
  preview_preferences: previewPreferencesSchema,
  parent_theme_id: z.string().uuid().optional(),
  inheritance_strategy: z.enum(['merge', 'override', 'replace'] as const),
  inherited_settings: z.record(z.unknown())
}).catchall(z.any());

export type ThemeSchema = typeof themeSchema;