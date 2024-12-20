import { ThemeBase } from '../core/base';

export interface ThemeContextType {
  theme: ThemeBase | null;
  updateTheme: (newTheme: ThemeBase) => Promise<void>;
}