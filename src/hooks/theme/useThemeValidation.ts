import { useMemo } from 'react';
import { ThemeValidationResult, ThemeValidationError, ThemeBase } from '@/types/theme/core/types';

interface ValidationRule {
  field: string;
  validator: (value: any) => boolean;
  message: string;
}

const defaultValidationRules: ValidationRule[] = [
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
    return (rules: ValidationRule[] = defaultValidationRules): ThemeValidationResult => {
      const errors: ThemeValidationError[] = [];
      
      rules.forEach(rule => {
        if (!rule.validator(theme[rule.field])) {
          errors.push({
            field: rule.field,
            message: rule.message,
            code: `invalid_${rule.field}`
          });
        }
      });

      return {
        isValid: errors.length === 0,
        errors
      };
    };
  }, [theme]);

  return { validate };
};