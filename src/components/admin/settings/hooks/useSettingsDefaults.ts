import { ThemeBase } from "@/types";

export const DEFAULT_SETTINGS: ThemeBase = {
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

export const useSettingsDefaults = () => {
  return DEFAULT_SETTINGS;
};