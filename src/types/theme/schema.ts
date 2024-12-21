import { z } from 'zod';
import { ThemeMode, ThemeComponentType, TransitionType, ThemeInheritanceStrategy } from './core/types';

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
  border_radius: z.string().optional(),
  spacing_unit: z.string().optional(),
  transition_duration: z.string().optional(),
  shadow_color: z.string().optional(),
  hover_scale: z.string().optional(),
  box_shadow: z.string().optional(),
  backdrop_blur: z.string().optional(),
  transition_type: z.enum(['fade', 'slide', 'scale', 'blur']).optional(),
  theme_mode: z.enum(['light', 'dark', 'system']).optional(),
  component_type: z.enum(['color', 'typography', 'layout', 'animation', 'effect']).optional(),
  preview_preferences: z.object({
    real_time_updates: z.boolean(),
    animation_enabled: z.boolean(),
    glass_effect_level: z.enum(['low', 'medium', 'high']),
    update_debounce_ms: z.number()
  }).optional(),
  parent_theme_id: z.string().uuid().optional(),
  inheritance_strategy: z.enum(['merge', 'override', 'replace']).optional(),
  logo_url: z.string().url().optional(),
  favicon_url: z.string().url().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().optional(),
  state_version: z.number().optional(),
  last_sync: z.string().optional()
});

export type SettingsFormData = z.infer<typeof settingsSchema>;