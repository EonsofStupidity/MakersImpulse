import { Settings } from "@/components/admin/settings/types";
import type { DatabaseSettingsRow } from "../types/theme";

// Type guard for transition type
const isValidTransitionType = (value: string | undefined | null): value is 'fade' | 'slide' | 'scale' => {
  return value === 'fade' || value === 'slide' || value === 'scale';
};

// Default theme settings
export const DEFAULT_THEME_SETTINGS: Settings = {
  site_title: "MakersImpulse",
  tagline: "Create, Share, Inspire",
  primary_color: "#7FFFD4",
  secondary_color: "#FFB6C1",
  accent_color: "#E6E6FA",
  text_primary_color: "#FFFFFF",
  text_secondary_color: "#A1A1AA",
  text_link_color: "#3B82F6",
  text_heading_color: "#FFFFFF",
  neon_cyan: "#41f0db",
  neon_pink: "#ff0abe",
  neon_purple: "#8000ff",
  border_radius: "0.5rem",
  spacing_unit: "1rem",
  transition_duration: "0.3s",
  shadow_color: "#000000",
  hover_scale: "1.05",
  font_family_heading: "Inter",
  font_family_body: "Inter",
  font_size_base: "16px",
  font_weight_normal: "400",
  font_weight_bold: "700",
  line_height_base: "1.5",
  letter_spacing: "normal",
  transition_type: "fade",
  box_shadow: "none",
  backdrop_blur: "0",
};

export const convertDbSettingsToTheme = (dbSettings: DatabaseSettingsRow | null): Settings => {
  if (!dbSettings) {
    console.log("No settings found, using defaults");
    return DEFAULT_THEME_SETTINGS;
  }

  const transitionType = isValidTransitionType(dbSettings.transition_type) 
    ? dbSettings.transition_type 
    : 'fade';

  return {
    site_title: dbSettings.site_title || DEFAULT_THEME_SETTINGS.site_title,
    tagline: dbSettings.tagline || DEFAULT_THEME_SETTINGS.tagline,
    primary_color: dbSettings.primary_color || DEFAULT_THEME_SETTINGS.primary_color,
    secondary_color: dbSettings.secondary_color || DEFAULT_THEME_SETTINGS.secondary_color,
    accent_color: dbSettings.accent_color || DEFAULT_THEME_SETTINGS.accent_color,
    logo_url: dbSettings.logo_url,
    favicon_url: dbSettings.favicon_url,
    theme_mode: dbSettings.theme_mode || 'system',
    text_primary_color: dbSettings.text_primary_color || DEFAULT_THEME_SETTINGS.text_primary_color,
    text_secondary_color: dbSettings.text_secondary_color || DEFAULT_THEME_SETTINGS.text_secondary_color,
    text_link_color: dbSettings.text_link_color || DEFAULT_THEME_SETTINGS.text_link_color,
    text_heading_color: dbSettings.text_heading_color || DEFAULT_THEME_SETTINGS.text_heading_color,
    neon_cyan: dbSettings.neon_cyan || DEFAULT_THEME_SETTINGS.neon_cyan,
    neon_pink: dbSettings.neon_pink || DEFAULT_THEME_SETTINGS.neon_pink,
    neon_purple: dbSettings.neon_purple || DEFAULT_THEME_SETTINGS.neon_purple,
    border_radius: dbSettings.border_radius || DEFAULT_THEME_SETTINGS.border_radius,
    spacing_unit: dbSettings.spacing_unit || DEFAULT_THEME_SETTINGS.spacing_unit,
    transition_duration: dbSettings.transition_duration || DEFAULT_THEME_SETTINGS.transition_duration,
    shadow_color: dbSettings.shadow_color || DEFAULT_THEME_SETTINGS.shadow_color,
    hover_scale: dbSettings.hover_scale || DEFAULT_THEME_SETTINGS.hover_scale,
    font_family_heading: dbSettings.font_family_heading || DEFAULT_THEME_SETTINGS.font_family_heading,
    font_family_body: dbSettings.font_family_body || DEFAULT_THEME_SETTINGS.font_family_body,
    font_size_base: dbSettings.font_size_base || DEFAULT_THEME_SETTINGS.font_size_base,
    font_weight_normal: dbSettings.font_weight_normal || DEFAULT_THEME_SETTINGS.font_weight_normal,
    font_weight_bold: dbSettings.font_weight_bold || DEFAULT_THEME_SETTINGS.font_weight_bold,
    line_height_base: dbSettings.line_height_base || DEFAULT_THEME_SETTINGS.line_height_base,
    letter_spacing: dbSettings.letter_spacing || DEFAULT_THEME_SETTINGS.letter_spacing,
    box_shadow: dbSettings.box_shadow || DEFAULT_THEME_SETTINGS.box_shadow,
    backdrop_blur: dbSettings.backdrop_blur || DEFAULT_THEME_SETTINGS.backdrop_blur,
    transition_type: transitionType,
  };
};

export const applyThemeToDocument = (settings: Settings) => {
  console.log("Applying theme to document:", settings);
  const root = document.documentElement;
  
  // Apply colors
  root.style.setProperty('--primary', settings.primary_color);
  root.style.setProperty('--secondary', settings.secondary_color);
  root.style.setProperty('--accent', settings.accent_color);
  root.style.setProperty('--text-primary', settings.text_primary_color);
  root.style.setProperty('--text-secondary', settings.text_secondary_color);
  root.style.setProperty('--text-link', settings.text_link_color);
  root.style.setProperty('--text-heading', settings.text_heading_color);
  root.style.setProperty('--neon-cyan', settings.neon_cyan);
  root.style.setProperty('--neon-pink', settings.neon_pink);
  root.style.setProperty('--neon-purple', settings.neon_purple);

  // Apply spacing and layout
  root.style.setProperty('--border-radius', settings.border_radius);
  root.style.setProperty('--spacing-unit', settings.spacing_unit);
  root.style.setProperty('--transition-duration', settings.transition_duration);
  root.style.setProperty('--shadow-color', settings.shadow_color);
  root.style.setProperty('--hover-scale', settings.hover_scale);

  // Apply typography
  document.body.style.fontFamily = settings.font_family_body;
  root.style.setProperty('--font-heading', settings.font_family_heading);
  root.style.setProperty('--font-size-base', settings.font_size_base);
  root.style.setProperty('--font-weight-normal', settings.font_weight_normal);
  root.style.setProperty('--font-weight-bold', settings.font_weight_bold);
  root.style.setProperty('--line-height-base', settings.line_height_base);
  root.style.setProperty('--letter-spacing', settings.letter_spacing);
};