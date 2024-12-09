import { Database } from './database';

export type SiteSettings = Database['public']['Tables']['site_settings']['Row'];
export type AdminSettings = Database['public']['Tables']['admin_settings']['Row'];

export interface ThemeSettings {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface FontSettings {
  family: {
    heading: string;
    body: string;
  };
  size: {
    base: string;
    heading: Record<string, string>;
  };
  weight: {
    normal: string;
    bold: string;
  };
}