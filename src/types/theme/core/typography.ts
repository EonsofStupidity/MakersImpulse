export interface FontFamilyConfig {
  heading: string;
  body: string;
}

export interface FontWeightConfig {
  normal: string;
  bold: string;
}

export interface ThemeTypography {
  fontFamily: FontFamilyConfig;
  fontSize: string;
  fontWeight: FontWeightConfig;
  lineHeight: string;
  letterSpacing: string;
}