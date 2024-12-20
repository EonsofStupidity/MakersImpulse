import { Theme, DatabaseSettingsRow } from '@/types/theme';
import { DEFAULT_BASE_PROPERTIES } from '@/types/theme/core/base';

export const convertDbSettingsToTheme = (settings: DatabaseSettingsRow | null): Theme => {
  if (!settings) {
    console.log("Using default theme settings");
    return DEFAULT_BASE_PROPERTIES;
  }

  return {
    ...DEFAULT_BASE_PROPERTIES,
    ...settings
  };
};

export const applyThemeToDocument = (theme: Theme) => {
  console.log("Applying theme to document:", theme);
  
  const cssVars = {
    '--primary-color': theme.primary_color,
    '--secondary-color': theme.secondary_color,
    '--accent-color': theme.accent_color,
    '--text-primary-color': theme.text_primary_color,
    '--text-secondary-color': theme.text_secondary_color,
    '--text-link-color': theme.text_link_color,
    '--text-heading-color': theme.text_heading_color,
    '--neon-cyan': theme.neon_cyan,
    '--neon-pink': theme.neon_pink,
    '--neon-purple': theme.neon_purple,
    '--font-family-heading': theme.font_family_heading,
    '--font-family-body': theme.font_family_body,
    '--font-size-base': theme.font_size_base,
    '--font-weight-normal': theme.font_weight_normal,
    '--font-weight-bold': theme.font_weight_bold,
    '--line-height-base': theme.line_height_base,
    '--letter-spacing': theme.letter_spacing,
    '--border-radius': theme.border_radius,
    '--spacing-unit': theme.spacing_unit,
    '--transition-duration': theme.transition_duration,
    '--shadow-color': theme.shadow_color,
    '--hover-scale': theme.hover_scale,
    '--box-shadow': theme.box_shadow,
    '--backdrop-blur': theme.backdrop_blur
  };

  Object.entries(cssVars).forEach(([key, value]) => {
    if (value) {
      document.documentElement.style.setProperty(key, value);
    }
  });
};