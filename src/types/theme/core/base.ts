import { ThemeMode, ThemeComponentType } from './types';
import { ThemeColors } from './colors';
import { ThemeTypography } from './typography';
import { ThemeEffects } from './effects';

export interface ThemeBase {
  id?: string;
  site_title: string;
  tagline: string;
  colors: ThemeColors;
  typography: ThemeTypography;
  effects: ThemeEffects;
  theme_mode: ThemeMode;
  component_type?: ThemeComponentType;
  logo_url?: string;
  favicon_url?: string;
  updated_at?: string;
  updated_by?: string;
  security_settings?: SecuritySettings;
  state_version?: number;
  last_sync?: string;
}

export interface SecuritySettings {
  ip_blacklist: string[];
  ip_whitelist: string[];
  max_login_attempts: number;
  rate_limit_requests: number;
  session_timeout_minutes: number;
  lockout_duration_minutes: number;
  rate_limit_window_minutes: number;
}

export const DEFAULT_BASE_PROPERTIES: ThemeBase = {
  site_title: 'MakersImpulse',
  tagline: 'Create, Share, Inspire',
  colors: {
    primary: '#7FFFD4',
    secondary: '#FFB6C1',
    accent: '#E6E6FA',
    text: {
      primary: '#FFFFFF',
      secondary: '#A1A1AA',
      link: '#3B82F6',
      heading: '#FFFFFF'
    },
    neon: {
      cyan: '#41f0db',
      pink: '#ff0abe',
      purple: '#8000ff'
    }
  },
  typography: {
    fontFamily: {
      heading: 'Inter',
      body: 'Inter'
    },
    fontSize: '16px',
    fontWeight: {
      normal: '400',
      bold: '700'
    },
    lineHeight: '1.5',
    letterSpacing: 'normal'
  },
  effects: {
    borderRadius: '0.5rem',
    spacing: '1rem',
    transitions: {
      duration: '0.3s',
      type: 'fade'
    },
    shadows: {
      color: '#000000',
      boxShadow: 'none',
      backdropBlur: '0'
    },
    hoverScale: '1.05'
  },
  theme_mode: 'dark'
};