import { z } from 'zod';

const securitySettingsSchema = z.object({
  ip_blacklist: z.array(z.string()).optional(),
  ip_whitelist: z.array(z.string()).optional(),
  max_login_attempts: z.number().optional(),
  rate_limit_requests: z.number().optional(),
  session_timeout_minutes: z.number().optional(),
  lockout_duration_minutes: z.number().optional(),
  rate_limit_window_minutes: z.number().optional()
});

export const settingsSchema = z.object({
  site_title: z.string().min(1, "Site title is required"),
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
  transition_type: z.enum(['fade', 'slide', 'scale', 'blur']).optional(),
  menu_animation_type: z.enum(['fade', 'slide-down', 'scale', 'blur']).optional(),
  theme_mode: z.enum(['light', 'dark', 'system']).optional(),
  component_type: z.enum(['color', 'typography', 'layout', 'animation', 'effect']).optional(),
  logo_url: z.string().optional(),
  favicon_url: z.string().optional(),
  security_settings: securitySettingsSchema.optional()
});