import { DatabaseSettings } from '@/types/database/settings';
import { Theme } from '@/types/theme/core';
import { BaseSettings } from '@/types/settings/base';

export const convertDbSettingsToTheme = (settings: DatabaseSettings | null): Theme => {
  if (!settings) {
    return DEFAULT_THEME;
  }

  return {
    colors: {
      primary: settings.primary_color,
      secondary: settings.secondary_color,
      accent: settings.accent_color,
      text: {
        primary: settings.text_primary_color,
        secondary: settings.text_secondary_color,
        link: settings.text_link_color,
        heading: settings.text_heading_color
      },
      neon: {
        cyan: settings.neon_cyan,
        pink: settings.neon_pink,
        purple: settings.neon_purple
      }
    },
    typography: {
      fontFamily: {
        heading: settings.font_family_heading,
        body: settings.font_family_body
      },
      fontSize: settings.font_size_base,
      fontWeight: {
        normal: settings.font_weight_normal,
        bold: settings.font_weight_bold
      },
      lineHeight: settings.line_height_base,
      letterSpacing: settings.letter_spacing
    },
    effects: {
      borderRadius: settings.border_radius,
      spacing: settings.spacing_unit,
      transitions: {
        duration: settings.transition_duration,
        type: settings.transition_type || 'fade'
      },
      shadows: {
        color: settings.shadow_color,
        boxShadow: settings.box_shadow || 'none',
        backdropBlur: settings.backdrop_blur || '0'
      },
      hoverScale: settings.hover_scale
    },
    mode: settings.theme_mode || 'dark'
  };
};

export const convertDbSettingsToSettings = (settings: DatabaseSettings | null): BaseSettings => {
  if (!settings) {
    return DEFAULT_SETTINGS;
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