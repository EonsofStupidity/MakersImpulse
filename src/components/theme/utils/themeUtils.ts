import { Theme, DatabaseSettingsRow } from "../types/theme";
import { BaseThemeProperties, DEFAULT_BASE_PROPERTIES } from "@/types/theme-base";

export const DEFAULT_THEME_SETTINGS: Theme = DEFAULT_BASE_PROPERTIES;

export const convertDbSettingsToTheme = (settings: DatabaseSettingsRow | null): Theme => {
  if (!settings) {
    console.log("Using default theme settings");
    return DEFAULT_THEME_SETTINGS;
  }

  const theme: Theme = {
    id: settings.id,
    site_title: settings.site_title,
    tagline: settings.tagline || DEFAULT_THEME_SETTINGS.tagline,
    primary_color: settings.primary_color || DEFAULT_THEME_SETTINGS.primary_color,
    secondary_color: settings.secondary_color || DEFAULT_THEME_SETTINGS.secondary_color,
    accent_color: settings.accent_color || DEFAULT_THEME_SETTINGS.accent_color,
    text_primary_color: settings.text_primary_color || DEFAULT_THEME_SETTINGS.text_primary_color,
    text_secondary_color: settings.text_secondary_color || DEFAULT_THEME_SETTINGS.text_secondary_color,
    text_link_color: settings.text_link_color || DEFAULT_THEME_SETTINGS.text_link_color,
    text_heading_color: settings.text_heading_color || DEFAULT_THEME_SETTINGS.text_heading_color,
    neon_cyan: settings.neon_cyan || DEFAULT_THEME_SETTINGS.neon_cyan,
    neon_pink: settings.neon_pink || DEFAULT_THEME_SETTINGS.neon_pink,
    neon_purple: settings.neon_purple || DEFAULT_THEME_SETTINGS.neon_purple,
    font_family_heading: settings.font_family_heading,
    font_family_body: settings.font_family_body,
    font_size_base: settings.font_size_base,
    font_weight_normal: settings.font_weight_normal,
    font_weight_bold: settings.font_weight_bold,
    line_height_base: settings.line_height_base,
    letter_spacing: settings.letter_spacing,
    border_radius: settings.border_radius || DEFAULT_THEME_SETTINGS.border_radius,
    spacing_unit: settings.spacing_unit || DEFAULT_THEME_SETTINGS.spacing_unit,
    transition_duration: settings.transition_duration || DEFAULT_THEME_SETTINGS.transition_duration,
    shadow_color: settings.shadow_color || DEFAULT_THEME_SETTINGS.shadow_color,
    hover_scale: settings.hover_scale || DEFAULT_THEME_SETTINGS.hover_scale,
    box_shadow: settings.box_shadow || DEFAULT_THEME_SETTINGS.box_shadow,
    backdrop_blur: settings.backdrop_blur || DEFAULT_THEME_SETTINGS.backdrop_blur,
    transition_type: settings.transition_type as Theme['transition_type'] || DEFAULT_THEME_SETTINGS.transition_type,
    theme_mode: settings.theme_mode || DEFAULT_THEME_SETTINGS.theme_mode,
    logo_url: settings.logo_url,
    favicon_url: settings.favicon_url,
    updated_at: settings.updated_at,
    updated_by: settings.updated_by,
    security_settings: settings.security_settings,
    state_version: settings.state_version,
    last_sync: settings.last_sync,
    component_type: settings.component_type
  };

  return theme;
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