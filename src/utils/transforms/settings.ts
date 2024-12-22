import { ThemeBase } from '@/types/theme/core/types';
import { Json } from '@/types/database/json';

export const transformDatabaseSettings = (data: Json): ThemeBase => {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid settings data');
  }

  // Ensure inherited_settings is properly typed as Record<string, Json>
  const inherited_settings: Record<string, Json> = {};
  if (typeof data === 'object' && data.inherited_settings) {
    Object.entries(data.inherited_settings as Record<string, Json>).forEach(([key, value]) => {
      inherited_settings[key] = value;
    });
  }

  // Convert preview_preferences if it's a string
  const preview_preferences = typeof data.preview_preferences === 'string' 
    ? JSON.parse(data.preview_preferences)
    : data.preview_preferences || {
        real_time_updates: true,
        animation_enabled: true,
        glass_effect_level: 'medium',
        update_debounce_ms: 100
      };

  // Cast the entire object to ThemeBase after ensuring all properties are correct
  return {
    ...data,
    inherited_settings,
    preview_preferences
  } as ThemeBase;
};

export const convertToUpdateParams = (settings: Partial<ThemeBase>): Record<string, string> => {
  const prefix = 'p_';
  const result: Record<string, string> = {};

  Object.entries(settings).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (typeof value === 'object') {
        result[`${prefix}${key}`] = JSON.stringify(value);
      } else {
        result[`${prefix}${key}`] = String(value);
      }
    }
  });

  return result;
};