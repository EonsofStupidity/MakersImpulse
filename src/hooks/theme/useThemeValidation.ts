import { useMemo } from 'react';
import { ThemeValidationRule, ThemeValidationResult } from '@/types/theme/core/validation';
import { ThemeBase } from '@/types/theme/core/types';

const defaultValidationRules: ThemeValidationRule[] = [
  {
    field: 'site_title',
    validator: (value) => typeof value === 'string' && value.length > 0,
    message: 'Site title is required'
  },
  {
    field: 'primary_color',
    validator: (value) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value),
    message: 'Invalid primary color format'
  }
];

export const useThemeValidation = (theme: Partial<ThemeBase>) => {
  const validate = useMemo(() => {
    return (rules: ThemeValidationRule[] = defaultValidationRules): ThemeValidationResult => {
      const errors: Record<string, string[]> = {};
      
      rules.forEach(rule => {
        if (!rule.validator(theme[rule.field])) {
          if (!errors[rule.field]) {
            errors[rule.field] = [];
          }
          errors[rule.field].push(rule.message);
        }
      });

      return {
        isValid: Object.keys(errors).length === 0,
        errors
      };
    };
  }, [theme]);

  return { validate };
};