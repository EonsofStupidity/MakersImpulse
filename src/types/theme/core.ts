import { ThemeColors } from './colors';
import { ThemeTypography } from './typography';
import { ThemeEffects } from './effects';

export interface CoreTheme {
  colors: ThemeColors;
  typography: ThemeTypography;
  effects: ThemeEffects;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface Theme extends CoreTheme {
  mode?: ThemeMode;
}

export const DEFAULT_THEME: Theme = {
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
  mode: 'dark'
};