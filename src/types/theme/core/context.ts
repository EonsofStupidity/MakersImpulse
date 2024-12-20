import { ThemeBase } from './base';

export interface ThemeContextType {
  theme: ThemeBase;
  updateTheme: (theme: Partial<ThemeBase>) => Promise<void>;
}