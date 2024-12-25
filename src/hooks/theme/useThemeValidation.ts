import { useCallback } from 'react';
import { ThemeValidationError, ThemeValidationResult, ThemeBase } from '@/types/theme/core/types';

export const useThemeValidation = () => {
  const validateTheme = useCallback((theme: Partial<ThemeBase>): ThemeValidationResult => {
    const errors: ThemeValidationError[] = [];

    // Required fields validation
    if (!theme.site_title) {
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
      const color = theme[field as keyof ThemeBase];
      if (color && !colorRegex.test(color as string)) {
        errors.push({
          field,
          message: `Invalid color format for ${field}. Must be a valid hex color`,
          code: 'INVALID_COLOR'
        });
      }
    });

    // Numeric validation
    if (theme.default_animation_duration !== undefined && 
        (theme.default_animation_duration < 0 || theme.default_animation_duration > 2000)) {
      errors.push({
        field: 'default_animation_duration',
        message: 'Animation duration must be between 0 and 2000ms',
        code: 'INVALID_RANGE'
      });
    }

    // Preview preferences validation
    if (theme.preview_preferences) {
      const { update_debounce_ms, glass_effect_level } = theme.preview_preferences;
      
      if (update_debounce_ms !== undefined && (update_debounce_ms < 0 || update_debounce_ms > 2000)) {
        errors.push({
          field: 'preview_preferences.update_debounce_ms',
          message: 'Debounce time must be between 0 and 2000ms',
          code: 'INVALID_RANGE'
        });
      }

      if (glass_effect_level && !['low', 'medium', 'high'].includes(glass_effect_level)) {
        errors.push({
          field: 'preview_preferences.glass_effect_level',
          message: 'Invalid glass effect level',
          code: 'INVALID_VALUE'
        });
      }
    }

    // Font validation
    if (theme.font_size_base && !/^\d+(\.\d+)?(px|rem|em)$/.test(theme.font_size_base)) {
      errors.push({
        field: 'font_size_base',
        message: 'Invalid font size format. Must include units (px, rem, or em)',
        code: 'INVALID_FORMAT'
      });
    }

    // Theme mode validation
    if (theme.theme_mode && !['light', 'dark', 'system'].includes(theme.theme_mode)) {
      errors.push({
        field: 'theme_mode',
        message: 'Invalid theme mode',
        code: 'INVALID_VALUE'
      });
    }

    // Transition type validation
    if (theme.transition_type && !['fade', 'slide', 'scale', 'blur'].includes(theme.transition_type)) {
      errors.push({
        field: 'transition_type',
        message: 'Invalid transition type',
        code: 'INVALID_VALUE'
      });
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }, []);

  return {
    validateTheme
  };
};
