import { z } from 'zod';
import { ThemeBase } from './types';

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
  border_radius: z.string(),
  spacing_unit: z.string(),
  transition_duration: z.string(),
  shadow_color: z.string(),
  hover_scale: z.string(),
  box_shadow: z.string(),
  backdrop_blur: z.string(),
  theme_mode: z.enum(['light', 'dark', 'system']),
  transition_type: z.enum(['fade', 'slide', 'scale', 'blur']),
  real_time_toggle: z.boolean(),
  animations_enabled: z.boolean(),
  default_animation_duration: z.number(),
  preview_preferences: z.object({
    real_time_updates: z.boolean(),
    animation_enabled: z.boolean(),
    glass_effect_level: z.enum(['low', 'medium', 'high']),
    update_debounce_ms: z.number()
  }),
  inheritance_strategy: z.enum(['merge', 'override', 'replace']),
  inherited_settings: z.record(z.unknown())
}) satisfies z.ZodType<ThemeBase>;