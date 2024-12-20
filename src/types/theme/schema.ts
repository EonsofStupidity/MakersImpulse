import { z } from 'zod';
import { ThemeMode, ThemeComponentType, TransitionType } from './core/types';

export const settingsSchema = z.object({
  id: z.string().optional(),
  site_title: z.string().min(1, "Site title is required"),
  tagline: z.string().optional(),
  primary_color: z.string().default('#7FFFD4'),
  secondary_color: z.string().default('#FFB6C1'),
  accent_color: z.string().default('#E6E6FA'),
  text_primary_color: z.string().default('#FFFFFF'),
  text_secondary_color: z.string().default('#A1A1AA'),
  text_link_color: z.string().default('#3B82F6'),
  text_heading_color: z.string().default('#FFFFFF'),
  neon_cyan: z.string().default('#41f0db'),
  neon_pink: z.string().default('#ff0abe'),
  neon_purple: z.string().default('#8000ff'),
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
  transition_type: z.enum(['fade', 'slide', 'scale', 'blur']).optional(),
  theme_mode: z.enum(['light', 'dark', 'system']).optional().default('dark'),
  component_type: z.enum(['color', 'typography', 'layout', 'animation', 'effect']).optional(),
  logo_url: z.string().optional(),
  favicon_url: z.string().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().optional(),
  state_version: z.number().optional(),
  last_sync: z.string().optional()
});

export type SettingsFormData = z.infer<typeof settingsSchema>;