import { ThemeBase, ThemeValidationError, ThemeValidationResult, ThemeValidationRule } from './types';

export const validateTheme = (theme: Partial<ThemeBase>, rules: ThemeValidationRule[]): ThemeValidationResult => {
  const errors: ThemeValidationError[] = [];

  rules.forEach(rule => {
    const value = theme[rule.field];
    if (!rule.validator(value)) {
      errors.push({
        field: rule.field,
        message: rule.message
      });
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};