import { ThemeBase } from '@/types/theme/types';
import { DEFAULT_BASE_PROPERTIES } from '@/types/theme/base';
import type { BaseSettings } from '@/types/settings/base';

export const convertDbSettingsToTheme = (settings: any | null): ThemeBase => {
  if (!settings) {
    console.log("Using default theme settings");
    return DEFAULT_BASE_PROPERTIES;
  }

  return {
    ...DEFAULT_BASE_PROPERTIES,
    ...settings
  };
};

export const convertDbSettingsToSettings = (settings: any | null): BaseSettings => {
  if (!settings) {
    return DEFAULT_BASE_PROPERTIES;
  }

  return {
    id: settings.id,
    site_title: settings.site_title,
    tagline: settings.tagline,
    logo_url: settings.logo_url,
    favicon_url: settings.favicon_url,
    theme_mode: settings.theme_mode || 'dark',
    security_settings: settings.security_settings,
    state_version: settings.state_version,
    last_sync: settings.last_sync,
    updated_at: settings.updated_at,
    updated_by: settings.updated_by
  };
};

export const convertToUpdateParams = (settings: any) => ({
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
