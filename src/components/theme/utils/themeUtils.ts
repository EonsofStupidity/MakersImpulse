import { ThemeBase } from '@/types';

export const DEFAULT_THEME_SETTINGS: ThemeBase = {
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
  theme_mode: 'dark',
  transition_type: 'fade',
  real_time_toggle: true,
  animations_enabled: true,
  default_animation_duration: 300,
  preview_preferences: {
    real_time_updates: true,
    animation_enabled: true,
    glass_effect_level: 'medium',
    update_debounce_ms: 100
  },
  inheritance_strategy: 'merge',
  inherited_settings: {}
};

export const convertDbSettingsToTheme = (settings: any | null): ThemeBase => {
  if (!settings) {
    console.log("Using default theme settings");
    return DEFAULT_THEME_SETTINGS;
  }

  return {
    ...DEFAULT_THEME_SETTINGS,
    ...settings
  };
};

export const applyThemeToDocument = (theme: ThemeBase) => {
  console.log("Applying theme to document:", theme);
  
  const cssVars = {
    '--primary': theme.primary_color,
    '--secondary': theme.secondary_color,
    '--accent': theme.accent_color,
    '--foreground': theme.text_primary_color,
    '--muted-foreground': theme.text_secondary_color,
    '--link': theme.text_link_color,
    '--heading': theme.text_heading_color,
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
    '--backdrop-blur': theme.backdrop_blur,
    '--animation-duration': `${theme.default_animation_duration}ms`
  };

  Object.entries(cssVars).forEach(([key, value]) => {
    if (value) {
      document.documentElement.style.setProperty(key, value);
    }
  });
};
