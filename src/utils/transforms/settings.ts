import type { ThemeBase } from '@/types/theme';
import { DEFAULT_THEME_SETTINGS } from '@/types/theme/core';
import type { BaseSettings } from '@/types/settings/base';

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

export const convertDbSettingsToSettings = (settings: any | null): BaseSettings => {
  if (!settings) {
    return DEFAULT_THEME_SETTINGS;
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