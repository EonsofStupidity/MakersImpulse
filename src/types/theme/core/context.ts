import { ThemeBase } from './types';
import { PreviewPreferences } from './types';

export interface ThemeContextType {
  theme: ThemeBase | null;
  updateTheme: (theme: Partial<ThemeBase>) => Promise<void>;
  previewPreferences?: PreviewPreferences;
}