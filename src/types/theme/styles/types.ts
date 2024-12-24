export type CSSUnit = 'px' | 'rem' | 'em' | 'vh' | 'vw' | '%' | '';
export type CSSValue = `${number}${CSSUnit}`;

export interface ThemeStyles {
  '--primary': string;
  '--secondary': string;
  '--accent': string;
  '--foreground': string;
  '--muted-foreground': string;
  '--link': string;
  '--heading': string;
  '--neon-cyan': string;
  '--neon-pink': string;
  '--neon-purple': string;
  '--font-family-heading': string;
  '--font-family-body': string;
  '--font-size-base': CSSValue;
  '--font-weight-normal': string;
  '--font-weight-bold': string;
  '--line-height-base': string;
  '--letter-spacing': string;
  '--border-radius': CSSValue;
  '--spacing-unit': CSSValue;
  '--transition-duration': string;
  '--shadow-color': string;
  '--hover-scale': string;
  '--box-shadow': string;
  '--backdrop-blur': CSSValue;
}