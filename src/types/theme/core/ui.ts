// UI-specific types for visual theme application
export interface UITheme {
  colors: UIThemeColors;
  typography: UIThemeTypography;
  effects: UIThemeEffects;
}

export interface UIThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  text: {
    primary: string;
    secondary: string;
    link: string;
    heading: string;
  };
  neon: {
    cyan: string;
    pink: string;
    purple: string;
  };
}

export interface UIThemeTypography {
  fontFamily: {
    heading: string;
    body: string;
  };
  fontSize: string;
  fontWeight: {
    normal: string;
    bold: string;
  };
  lineHeight: string;
  letterSpacing: string;
}

export interface UIThemeEffects {
  borderRadius: string;
  spacingUnit: string;
  transitionDuration: string;
  shadowColor: string;
  hoverScale: string;
}