import { ThemeBase } from '@/types/theme/types';

export interface Settings extends ThemeBase {
  id: string;
}

export interface SettingsResponse {
  success: boolean;
  data: Settings;
}

export interface SettingsUpdateParams {
  p_site_title: string;
  p_tagline: string;
  p_primary_color: string;
  p_secondary_color: string;
  p_accent_color: string;
  p_text_primary_color: string;
  p_text_secondary_color: string;
  p_text_link_color: string;
  p_text_heading_color: string;
  p_neon_cyan: string;
  p_neon_pink: string;
  p_neon_purple: string;
  p_border_radius: string;
  p_spacing_unit: string;
  p_transition_duration: string;
  p_shadow_color: string;
  p_hover_scale: string;
  p_font_family_heading: string;
  p_font_family_body: string;
  p_font_size_base: string;
  p_font_weight_normal: string;
  p_font_weight_bold: string;
  p_line_height_base: string;
  p_letter_spacing: string;
}