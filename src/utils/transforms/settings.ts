import { ThemeBase } from '@/types/theme/core/types';
import { Json } from '@/types/database/json';

export const transformDatabaseSettings = (data: any): ThemeBase => {
  if (!data) {
    return {} as ThemeBase;
  }

  // Ensure inherited_settings is properly typed as Record<string, Json>
  const inherited_settings: Record<string, Json> = {};
  if (data.inherited_settings) {
    Object.entries(data.inherited_settings).forEach(([key, value]) => {
      inherited_settings[key] = value as Json;
    });
  }

  // Convert preview_preferences if it's a string
  const preview_preferences = typeof data.preview_preferences === 'string' 
    ? JSON.parse(data.preview_preferences)
    : data.preview_preferences;

  return {
    ...data,
    inherited_settings,
    preview_preferences
  } as ThemeBase;
};

export const convertToUpdateParams = (settings: Partial<ThemeBase>) => {
  const prefix = 'p_';
  const result: Record<string, string> = {};

  Object.entries(settings).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      result[`${prefix}${key}`] = String(value);
    }
  });

  return result;
};