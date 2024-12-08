import { ValidationRule, ValidationConfig, ValidationResult } from '../types/validation';

export const createRegexRule = (pattern: string, message?: string): ValidationRule => ({
  type: 'regex',
  value: pattern,
  message: message || `Value does not match pattern ${pattern}`,
  validate: (value) => new RegExp(pattern).test(String(value))
});

export const createRangeRule = (min?: number, max?: number, message?: string): ValidationRule => ({
  type: 'range',
  value: { min, max },
  message: message || `Value must be between ${min} and ${max}`,
  validate: (value) => {
    const num = Number(value);
    if (isNaN(num)) return false;
    if (min !== undefined && num < min) return false;
    if (max !== undefined && num > max) return false;
    return true;
  }
});

export const createCustomRule = (
  validator: (value: any, rowData?: any) => boolean,
  message: string
): ValidationRule => ({
  type: 'custom',
  message,
  validate: validator
});

export const createConditionalRule = (
  condition: (rowData: any) => boolean,
  rule: ValidationRule,
  message?: string
): ValidationRule => ({
  type: 'conditional',
  message: message || rule.message,
  validate: (value, rowData) => !condition(rowData) || rule.validate(value, rowData)
});

export const validateValue = (
  value: any,
  config: ValidationConfig,
  rowData?: any
): ValidationResult => {
  const errors: string[] = [];

  // Check required
  if (config.required && (value === null || value === undefined || value === '')) {
    errors.push('Field is required');
    return { isValid: false, errors };
  }

  // Apply rules
  if (config.rules) {
    for (const rule of config.rules) {
      if (!rule.validate(value, rowData)) {
        errors.push(rule.message || 'Validation failed');
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};