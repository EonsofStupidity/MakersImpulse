import { z } from "zod";

export const settingsSchema = z.object({
  site_title: z.string().min(1, "Site title is required"),
  tagline: z.string().optional(),
  primary_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  secondary_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  accent_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  neon_cyan: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  neon_pink: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  neon_purple: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  text_primary_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  text_secondary_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  text_link_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  text_heading_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  border_radius: z.string(),
  spacing_unit: z.string(),
  transition_duration: z.string(),
  transition_type: z.enum(["fade", "slide", "scale", "blur"]).optional(),
  shadow_color: z.string(),
  hover_scale: z.string(),
  font_family_heading: z.string(),
  font_family_body: z.string(),
  font_size_base: z.string(),
  font_weight_normal: z.string(),
  font_weight_bold: z.string(),
  line_height_base: z.string(),
  letter_spacing: z.string(),
  menu_animation_type: z.enum(["fade", "slide-down", "scale", "blur"]).optional(),
  box_shadow: z.string().optional(),
  backdrop_blur: z.string().optional(),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;