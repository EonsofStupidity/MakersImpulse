import { Json } from "@/integrations/supabase/types";

export interface Settings {
  site_title: string;
  tagline?: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  text_primary_color: string;
  text_secondary_color: string;
  text_link_color: string;
  text_heading_color: string;
  neon_cyan: string;
  neon_pink: string;
  neon_purple: string;
  border_radius: string;
  spacing_unit: string;
  transition_duration: string;
  shadow_color: string;
  hover_scale: string;
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;
  box_shadow?: string;
  backdrop_blur?: string;
  transition_type: "fade" | "slide" | "scale" | "blur";
  menu_animation_type?: "fade" | "slide-down" | "scale" | "blur";
  theme_mode?: "light" | "dark" | "system";
  logo_url?: string;
  favicon_url?: string;
}

export type SettingsFormData = Settings;

export interface SettingsResponse {
  success: boolean;
  data: Settings;
}