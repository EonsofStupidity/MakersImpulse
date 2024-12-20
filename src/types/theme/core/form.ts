// Form-specific types for managing user input
export interface SiteSettingsFormValues {
  site_title: string;
  tagline?: string;
  colors: SiteSettingsColorValues;
  typography: SiteSettingsTypographyValues;
  effects: SiteSettingsEffectValues;
  security: SiteSettingsSecurityValues;
}

export interface SiteSettingsColorValues {
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

export interface SiteSettingsTypographyValues {
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

export interface SiteSettingsEffectValues {
  borderRadius?: string;
  spacingUnit?: string;
  transitionDuration?: string;
  shadowColor?: string;
  hoverScale?: string;
}

export interface SiteSettingsSecurityValues {
  ipBlacklist: string[];
  ipWhitelist: string[];
  maxLoginAttempts: number;
  rateLimitRequests: number;
  sessionTimeoutMinutes: number;
  lockoutDurationMinutes: number;
  rateLimitWindowMinutes: number;
}

export interface SiteSettingsFormState {
  isDirty: boolean;
  isSubmitting: boolean;
  submitError?: string;
}