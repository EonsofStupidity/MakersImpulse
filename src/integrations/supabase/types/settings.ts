import { Database } from './database';
import { BaseThemeProperties } from '@/types/theme-base';

export type SiteSettings = Database['public']['Tables']['site_settings']['Row'];
export type AdminSettings = Database['public']['Tables']['admin_settings']['Row'];

export interface ThemeConfig extends BaseThemeProperties {
  mode: 'light' | 'dark' | 'system';
}

export interface SystemConfig {
  maintenance: boolean;
  debugMode: boolean;
  cacheTimeout: number;
  maxUploadSize: number;
}

export const convertToUpdateParams = (settings: SiteSettings) => ({
  p_site_title: settings.site_title,
  p_tagline: settings.tagline || '',
  p_primary_color: settings.primary_color || '',
  p_secondary_color: settings.secondary_color || '',
  p_accent_color: settings.accent_color || '',
  p_text_primary_color: settings.text_primary_color || '',
  p_text_secondary_color: settings.text_secondary_color || '',
  p_text_link_color: settings.text_link_color || '',
  p_text_heading_color: settings.text_heading_color || '',
  p_neon_cyan: settings.neon_cyan || '',
  p_neon_pink: settings.neon_pink || '',
  p_neon_purple: settings.neon_purple || '',
  p_border_radius: settings.border_radius || '',
  p_spacing_unit: settings.spacing_unit || '',
  p_transition_duration: settings.transition_duration || '',
  p_shadow_color: settings.shadow_color || '',
  p_hover_scale: settings.hover_scale || '',
  p_font_family_heading: settings.font_family_heading,
  p_font_family_body: settings.font_family_body,
  p_font_size_base: settings.font_size_base,
  p_font_weight_normal: settings.font_weight_normal,
  p_font_weight_bold: settings.font_weight_bold,
  p_line_height_base: settings.line_height_base,
  p_letter_spacing: settings.letter_spacing
});
