import { BaseThemeProperties } from "@/types/theme-base";

export interface DatabaseSettings extends BaseThemeProperties {
  id: string;
  updated_at?: string;
  updated_by?: string;
  logo_url?: string;
  favicon_url?: string;
  state_version?: number;
  last_sync?: string;
  security_settings?: {
    ip_blacklist: string[];
    ip_whitelist: string[];
    max_login_attempts: number;
    rate_limit_requests: number;
    session_timeout_minutes: number;
    lockout_duration_minutes: number;
    rate_limit_window_minutes: number;
  };
}

export interface SettingsResponse {
  success: boolean;
  data: DatabaseSettings;
}

export interface SettingsUpdateParams {
  p_site_title: string;
  p_tagline?: string;
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

export type Settings = DatabaseSettings;

export const convertToUpdateParams = (settings: DatabaseSettings): SettingsUpdateParams => ({
  p_site_title: settings.site_title,
  p_tagline: settings.tagline,
  p_primary_color: settings.primary_color,
  p_secondary_color: settings.secondary_color,
  p_accent_color: settings.accent_color,
  p_text_primary_color: settings.text_primary_color,
  p_text_secondary_color: settings.text_secondary_color,
  p_text_link_color: settings.text_link_color,
  p_text_heading_color: settings.text_heading_color,
  p_neon_cyan: settings.neon_cyan,
  p_neon_pink: settings.neon_pink,
  p_neon_purple: settings.neon_purple,
  p_border_radius: settings.border_radius,
  p_spacing_unit: settings.spacing_unit,
  p_transition_duration: settings.transition_duration,
  p_shadow_color: settings.shadow_color,
  p_hover_scale: settings.hover_scale,
  p_font_family_heading: settings.font_family_heading,
  p_font_family_body: settings.font_family_body,
  p_font_size_base: settings.font_size_base,
  p_font_weight_normal: settings.font_weight_normal,
  p_font_weight_bold: settings.font_weight_bold,
  p_line_height_base: settings.line_height_base,
  p_letter_spacing: settings.letter_spacing
});