import { z } from 'zod';
import { ThemeMode, TransitionType, GlassEffectLevel } from './core/types';

export const previewPreferencesSchema = z.object({
  real_time_updates: z.boolean(),
  animation_enabled: z.boolean(),
  glass_effect_level: z.enum(['low', 'medium', 'high'] as const),
  update_debounce_ms: z.number()
});

export const settingsSchema = z.object({
  // Core Properties
  id: z.string().optional(),
  site_title: z.string().optional(),
  tagline: z.string().optional(),
  logo_url: z.string().optional(),
  favicon_url: z.string().optional(),

  // Colors
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

  // Typography
  font_family_heading: z.string(),
  font_family_body: z.string(),
  font_size_base: z.string(),
  font_weight_normal: z.string(),
  font_weight_bold: z.string(),
  line_height_base: z.string(),
  letter_spacing: z.string(),

  // Layout & Effects
  border_radius: z.string(),
  spacing_unit: z.string(),
  transition_duration: z.string(),
  shadow_color: z.string(),
  hover_scale: z.string(),
  box_shadow: z.string(),
  backdrop_blur: z.string(),

  // Behavior
  theme_mode: z.enum(['light', 'dark', 'system'] as const),
  transition_type: z.enum(['fade', 'slide', 'scale', 'blur'] as const),
  animations_enabled: z.boolean(),
  default_animation_duration: z.number(),
  preview_preferences: previewPreferencesSchema.optional()
});

export type SettingsFormData = z.infer<typeof settingsSchema>;