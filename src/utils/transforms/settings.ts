import { SettingsFormData } from '@/types/settings/core/types';
import { Json } from '@/types/core/json';

export const transformDatabaseSettings = (data: Json): SettingsFormData => {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Invalid settings data');
  }

  return {
    site_title: data.site_title as string || 'Untitled Site',
    tagline: data.tagline as string,
    logo_url: data.logo_url as string,
    favicon_url: data.favicon_url as string,
    created_at: data.created_at as string,
    updated_at: data.updated_at as string,
    created_by: data.created_by as string,
    updated_by: data.updated_by as string
  };
};