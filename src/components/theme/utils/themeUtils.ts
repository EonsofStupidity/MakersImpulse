import { Theme, DatabaseSettingsRow } from "../types/theme";

export const DEFAULT_THEME_SETTINGS: Theme = {
  site_title: 'MakersImpulse',
  tagline: 'Create, Share, Inspire',
  primary_color: '#7FFFD4',
  secondary_color: '#FFB6C1',
  accent_color: '#E6E6FA',
  text_primary_color: '#FFFFFF',
  text_secondary_color: '#A1A1AA',
  text_link_color: '#3B82F6',
  text_heading_color: '#FFFFFF',
  neon_cyan: '#41f0db',
  neon_pink: '#ff0abe',
  neon_purple: '#8000ff',
  font_family_heading: 'Inter',
  font_family_body: 'Inter',
  font_size_base: '16px',
  font_weight_normal: '400',
  font_weight_bold: '700',
  line_height_base: '1.5',
  letter_spacing: 'normal',
  border_radius: '0.5rem',
  spacing_unit: '1rem',
  transition_duration: '0.3s',
  shadow_color: '#000000',
  hover_scale: '1.05',
  box_shadow: 'none',
  backdrop_blur: '0',
  transition_type: 'fade',
  theme_mode: 'dark'
};

export const convertDbSettingsToTheme = (settings: DatabaseSettingsRow | null): Theme => {
  if (!settings) {
    console.log("Using default theme settings");
    return DEFAULT_THEME_SETTINGS;
  }

  return {
    id: settings.id,
    site_title: settings.site_title,
    tagline: settings.tagline || DEFAULT_THEME_SETTINGS.tagline,
    primary_color: settings.primary_color,
    secondary_color: settings.secondary_color,
    accent_color: settings.accent_color,
    text_primary_color: settings.text_primary_color,
    text_secondary_color: settings.text_secondary_color,
    text_link_color: settings.text_link_color,
    text_heading_color: settings.text_heading_color,
    neon_cyan: settings.neon_cyan,
    neon_pink: settings.neon_pink,
    neon_purple: settings.neon_purple,
    font_family_heading: settings.font_family_heading,
    font_family_body: settings.font_family_body,
    font_size_base: settings.font_size_base,
    font_weight_normal: settings.font_weight_normal,
    font_weight_bold: settings.font_weight_bold,
    line_height_base: settings.line_height_base,
    letter_spacing: settings.letter_spacing,
    border_radius: settings.border_radius,
    spacing_unit: settings.spacing_unit,
    transition_duration: settings.transition_duration,
    shadow_color: settings.shadow_color,
    hover_scale: settings.hover_scale,
    box_shadow: settings.box_shadow || DEFAULT_THEME_SETTINGS.box_shadow,
    backdrop_blur: settings.backdrop_blur || DEFAULT_THEME_SETTINGS.backdrop_blur,
    transition_type: settings.transition_type as Theme['transition_type'] || DEFAULT_THEME_SETTINGS.transition_type,
    theme_mode: settings.theme_mode || DEFAULT_THEME_SETTINGS.theme_mode
  };
};

export const applyThemeToDocument = (theme: Theme) => {
  console.log("Applying theme to document:", theme);
  document.documentElement.style.setProperty('--primary-color', theme.primary_color);
  document.documentElement.style.setProperty('--secondary-color', theme.secondary_color);
  document.documentElement.style.setProperty('--accent-color', theme.accent_color);
  document.documentElement.style.setProperty('--text-primary-color', theme.text_primary_color);
  document.documentElement.style.setProperty('--text-secondary-color', theme.text_secondary_color);
  document.documentElement.style.setProperty('--text-link-color', theme.text_link_color);
  document.documentElement.style.setProperty('--text-heading-color', theme.text_heading_color);
  document.documentElement.style.setProperty('--neon-cyan', theme.neon_cyan);
  document.documentElement.style.setProperty('--neon-pink', theme.neon_pink);
  document.documentElement.style.setProperty('--neon-purple', theme.neon_purple);
  document.documentElement.style.setProperty('--font-family-heading', theme.font_family_heading);
  document.documentElement.style.setProperty('--font-family-body', theme.font_family_body);
  document.documentElement.style.setProperty('--font-size-base', theme.font_size_base);
  document.documentElement.style.setProperty('--font-weight-normal', theme.font_weight_normal);
  document.documentElement.style.setProperty('--font-weight-bold', theme.font_weight_bold);
  document.documentElement.style.setProperty('--line-height-base', theme.line_height_base);
  document.documentElement.style.setProperty('--letter-spacing', theme.letter_spacing);
  document.documentElement.style.setProperty('--border-radius', theme.border_radius);
  document.documentElement.style.setProperty('--spacing-unit', theme.spacing_unit);
  document.documentElement.style.setProperty('--transition-duration', theme.transition_duration);
  document.documentElement.style.setProperty('--shadow-color', theme.shadow_color);
  document.documentElement.style.setProperty('--hover-scale', theme.hover_scale);
  document.documentElement.style.setProperty('--box-shadow', theme.box_shadow);
  document.documentElement.style.setProperty('--backdrop-blur', theme.backdrop_blur);
};