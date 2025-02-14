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

export const convertDbSettingsToTheme = (data: any): ThemeBase => {
  if (!data) {
    return DEFAULT_THEME_SETTINGS;
  }

  const preview_preferences = typeof data.preview_preferences === 'string' 
    ? JSON.parse(data.preview_preferences)
    : data.preview_preferences || DEFAULT_THEME_SETTINGS.preview_preferences;

  return {
    ...DEFAULT_THEME_SETTINGS,
    ...data,
    preview_preferences
  };
};

export const applyThemeToDocument = (theme: ThemeBase) => {
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

