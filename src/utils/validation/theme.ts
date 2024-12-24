import { ThemeState } from '@/types/theme/state/types';
import { ThemeStyles } from '@/types/theme/styles/types';
import { ThemeAnimation } from '@/types/theme/animations/types';

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export const validateThemeState = (state: Partial<ThemeState>): ValidationResult => {
  const errors: ValidationError[] = [];

  // Required fields
  if (!state.site_title) {
    errors.push({
      field: 'site_title',
      message: 'Site title is required',
      code: 'REQUIRED'
    });
  }

  // Color validation
  const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  const colorFields = [
    'primary_color',
    'secondary_color',
    'accent_color',
    'text_primary_color',
    'text_secondary_color',
    'text_link_color',
    'text_heading_color',
    'neon_cyan',
    'neon_pink',
    'neon_purple',
    'shadow_color'
  ];

  colorFields.forEach(field => {
    const color = state[field as keyof ThemeState];
    if (color && !colorRegex.test(color as string)) {
      errors.push({
        field,
        message: `Invalid color format for ${field}. Must be a valid hex color`,
        code: 'INVALID_COLOR'
      });
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateThemeStyles = (styles: Partial<ThemeStyles>): ValidationResult => {
  const errors: ValidationError[] = [];

  // CSS Variable validation
  Object.entries(styles).forEach(([key, value]) => {
    if (!key.startsWith('--')) {
      errors.push({
        field: key,
        message: 'CSS variable must start with --',
        code: 'INVALID_CSS_VAR'
      });
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateThemeAnimation = (animation: Partial<ThemeAnimation>): ValidationResult => {
  const errors: ValidationError[] = [];

  if (animation.duration && (animation.duration < 0 || animation.duration > 2000)) {
    errors.push({
      field: 'duration',
      message: 'Animation duration must be between 0 and 2000ms',
      code: 'INVALID_DURATION'
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};