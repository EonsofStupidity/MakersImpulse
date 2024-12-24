import { ThemeBase } from '../theme/core/types';

export interface SettingsFormData extends ThemeBase {
  site_title: string;
  tagline?: string;
  logo_url?: string;
  favicon_url?: string;
}