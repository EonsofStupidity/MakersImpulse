import { SiteSettings } from './types';

export interface SettingsContextType {
  settings: SiteSettings | null;
  updateSettings: (settings: Partial<SiteSettings>) => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}