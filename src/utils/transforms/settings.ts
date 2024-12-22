import { ThemeBase } from '@/types/theme/types';
import { Settings } from '@/types/theme';
import { Json } from '@/types/database/json';

export const transformDatabaseSettings = (data: any): Settings => {
  if (!data) {
    return {} as Settings;
  }

  // Ensure inherited_settings is properly typed as Record<string, Json>
  const inherited_settings: Record<string, Json> = {};
  if (data.inherited_settings) {
    Object.entries(data.inherited_settings).forEach(([key, value]) => {
      inherited_settings[key] = value as Json;
    });
  }

  return {
    ...data,
    inherited_settings
  };
};

export const convertToUpdateParams = (settings: Partial<ThemeBase>) => ({
  p_site_title: settings.site_title || '',
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
  p_font_family_heading: settings.font_family_heading || '',
  p_font_family_body: settings.font_family_body || '',
  p_font_size_base: settings.font_size_base || '',
  p_font_weight_normal: settings.font_weight_normal || '',
  p_font_weight_bold: settings.font_weight_bold || '',
  p_line_height_base: settings.line_height_base || '',
  p_letter_spacing: settings.letter_spacing || ''
});