import { DatabaseSettingsRow, Theme } from "../types/theme";

export const DEFAULT_THEME_SETTINGS: Theme = {
  siteTitle: 'MakersImpulse',
  primaryColor: '#7FFFD4',
  secondaryColor: '#FFB6C1',
  accentColor: '#E6E6FA',
  textPrimaryColor: '#FFFFFF',
  textSecondaryColor: '#A1A1AA',
  textLinkColor: '#3B82F6',
  textHeadingColor: '#FFFFFF',
  neonCyan: '#41f0db',
  neonPink: '#ff0abe',
  neonPurple: '#8000ff',
  fontFamilyHeading: 'Inter',
  fontFamilyBody: 'Inter',
  fontSizeBase: '16px',
  fontWeightNormal: '400',
  fontWeightBold: '700',
  lineHeightBase: '1.5',
  letterSpacing: 'normal'
};

export const convertDbSettingsToTheme = (settings: DatabaseSettingsRow | null): Theme => {
  if (!settings) {
    console.log("Using default theme settings");
    return DEFAULT_THEME_SETTINGS;
  }

  return {
    siteTitle: settings.site_title || DEFAULT_THEME_SETTINGS.siteTitle,
    primaryColor: settings.primary_color || DEFAULT_THEME_SETTINGS.primaryColor,
    secondaryColor: settings.secondary_color || DEFAULT_THEME_SETTINGS.secondaryColor,
    accentColor: settings.accent_color || DEFAULT_THEME_SETTINGS.accentColor,
    textPrimaryColor: settings.text_primary_color || DEFAULT_THEME_SETTINGS.textPrimaryColor,
    textSecondaryColor: settings.text_secondary_color || DEFAULT_THEME_SETTINGS.textSecondaryColor,
    textLinkColor: settings.text_link_color || DEFAULT_THEME_SETTINGS.textLinkColor,
    textHeadingColor: settings.text_heading_color || DEFAULT_THEME_SETTINGS.textHeadingColor,
    neonCyan: settings.neon_cyan || DEFAULT_THEME_SETTINGS.neonCyan,
    neonPink: settings.neon_pink || DEFAULT_THEME_SETTINGS.neonPink,
    neonPurple: settings.neon_purple || DEFAULT_THEME_SETTINGS.neonPurple,
    fontFamilyHeading: settings.font_family_heading || DEFAULT_THEME_SETTINGS.fontFamilyHeading,
    fontFamilyBody: settings.font_family_body || DEFAULT_THEME_SETTINGS.fontFamilyBody,
    fontSizeBase: settings.font_size_base || DEFAULT_THEME_SETTINGS.fontSizeBase,
    fontWeightNormal: settings.font_weight_normal || DEFAULT_THEME_SETTINGS.fontWeightNormal,
    fontWeightBold: settings.font_weight_bold || DEFAULT_THEME_SETTINGS.fontWeightBold,
    lineHeightBase: settings.line_height_base || DEFAULT_THEME_SETTINGS.lineHeightBase,
    letterSpacing: settings.letter_spacing || DEFAULT_THEME_SETTINGS.letterSpacing
  };
};

export const applyThemeToDocument = (theme: Theme) => {
  console.log("Applying theme to document:", theme);
  document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
  document.documentElement.style.setProperty('--secondary-color', theme.secondaryColor);
  document.documentElement.style.setProperty('--accent-color', theme.accentColor);
  document.documentElement.style.setProperty('--text-primary-color', theme.textPrimaryColor);
  document.documentElement.style.setProperty('--text-secondary-color', theme.textSecondaryColor);
  document.documentElement.style.setProperty('--text-link-color', theme.textLinkColor);
  document.documentElement.style.setProperty('--text-heading-color', theme.textHeadingColor);
  document.documentElement.style.setProperty('--neon-cyan', theme.neonCyan);
  document.documentElement.style.setProperty('--neon-pink', theme.neonPink);
  document.documentElement.style.setProperty('--neon-purple', theme.neonPurple);
  document.documentElement.style.setProperty('--font-family-heading', theme.fontFamilyHeading);
  document.documentElement.style.setProperty('--font-family-body', theme.fontFamilyBody);
  document.documentElement.style.setProperty('--font-size-base', theme.fontSizeBase);
  document.documentElement.style.setProperty('--font-weight-normal', theme.fontWeightNormal);
  document.documentElement.style.setProperty('--font-weight-bold', theme.fontWeightBold);
  document.documentElement.style.setProperty('--line-height-base', theme.lineHeightBase);
  document.documentElement.style.setProperty('--letter-spacing', theme.letterSpacing);
};