export type ThemeMode = 'light' | 'dark' | 'system';

export type ThemeComponentType = 
  | 'color'
  | 'typography'
  | 'layout'
  | 'animation'
  | 'effect';

export interface ThemeBase {
  id: string;
  theme_mode?: ThemeMode;
  component_type?: ThemeComponentType;
}