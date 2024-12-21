import { z } from 'zod';
import { ThemeMode, ThemeComponentType, TransitionType, ThemeInheritanceStrategy, GlassEffectLevel } from './core/types';

const previewPreferencesSchema = z.object({
  real_time_updates: z.boolean(),
  animation_enabled: z.boolean(),
  glass_effect_level: z.enum(['low', 'medium', 'high'] as const),
  update_debounce_ms: z.number().min(0).max(1000)
});

export const settingsSchema = z.object({
  id: z.string().uuid().optional(),
  site_title: z.string().min(1, "Site title is required"),
  tagline: z.string().optional(),
  primary_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color"),
  secondary_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color"),
  accent_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color"),
  text_primary_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color"),
  text_secondary_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color"),
  text_link_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color"),
  text_heading_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color"),
  neon_cyan: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color"),
  neon_pink: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color"),
  neon_purple: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color"),
  font_family_heading: z.string(),
  font_family_body: z.string(),
  font_size_base: z.string().regex(/^\d+(\.\d+)?(px|rem|em)$/, "Invalid font size"),
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
  transition_type: z.enum(['fade', 'slide', 'scale', 'blur'] as const),
  theme_mode: z.enum(['light', 'dark', 'system'] as const).optional(),
  component_type: z.enum(['color', 'typography', 'layout', 'animation', 'effect'] as const).optional(),
  real_time_toggle: z.boolean().default(true),
  animations_enabled: z.boolean().default(true),
  default_animation_duration: z.number().min(100).max(1000).default(300),
  preview_preferences: previewPreferencesSchema.optional(),
  parent_theme_id: z.string().uuid().optional(),
  inheritance_strategy: z.enum(['merge', 'override', 'replace'] as const).optional(),
  logo_url: z.string().url().optional(),
  favicon_url: z.string().url().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().optional(),
  state_version: z.number().optional(),
  last_sync: z.string().optional()
});

export type SettingsFormData = z.infer<typeof settingsSchema>;