import { UITheme } from './ui';
import { DbSiteSettingsUpdate, RawSiteSettingsRow } from './database';

export interface ThemeContextState {
  activeTheme: UITheme | null;
  updateTheme: (theme: UITheme) => void;
}

export interface SettingsContextState {
  settings: RawSiteSettingsRow | null;
  updateSettings: (settings: DbSiteSettingsUpdate) => Promise<void>;
}