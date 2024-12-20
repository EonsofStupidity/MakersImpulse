import { DatabaseSettings } from '@/types/database/settings';
import { Theme } from '@/types/theme/core';
import { BaseSettings } from '@/types/settings/base';
import { DEFAULT_THEME } from '@/types/theme/core';

export const convertDbSettingsToTheme = (settings: DatabaseSettings | null): Theme => {
  if (!settings) {
    console.log("Using default theme settings");
    return DEFAULT_THEME;
  }

  return {
    colors: {
      primary: settings.primary_color || DEFAULT_THEME.colors.primary,
      secondary: settings.secondary_color || DEFAULT_THEME.colors.secondary,
      accent: settings.accent_color || DEFAULT_THEME.colors.accent,
      text: {
        primary: settings.text_primary_color || DEFAULT_THEME.colors.text.primary,
        secondary: settings.text_secondary_color || DEFAULT_THEME.colors.text.secondary,
        link: settings.text_link_color || DEFAULT_THEME.colors.text.link,
        heading: settings.text_heading_color || DEFAULT_THEME.colors.text.heading
      },
      neon: {
        cyan: settings.neon_cyan || DEFAULT_THEME.colors.neon.cyan,
        pink: settings.neon_pink || DEFAULT_THEME.colors.neon.pink,
        purple: settings.neon_purple || DEFAULT_THEME.colors.neon.purple
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
      borderRadius: settings.border_radius || DEFAULT_THEME.effects.borderRadius,
      spacing: settings.spacing_unit || DEFAULT_THEME.effects.spacing,
      transitions: {
        duration: settings.transition_duration || DEFAULT_THEME.effects.transitions.duration,
        type: settings.transition_type as Theme['effects']['transitions']['type'] || DEFAULT_THEME.effects.transitions.type
      },
      shadows: {
        color: settings.shadow_color || DEFAULT_THEME.effects.shadows.color,
        boxShadow: settings.box_shadow || DEFAULT_THEME.effects.shadows.boxShadow,
        backdropBlur: settings.backdrop_blur || DEFAULT_THEME.effects.shadows.backdropBlur
      },
      hoverScale: settings.hover_scale || DEFAULT_THEME.effects.hoverScale
    },
    mode: settings.theme_mode || DEFAULT_THEME.mode,
    id: settings.id
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