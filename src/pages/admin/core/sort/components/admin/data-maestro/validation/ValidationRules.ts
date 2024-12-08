export interface ValidationRule {
  id: string;
  name: string;
  rule_type: string;
  configuration: Record<string, any>;
  is_global?: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateValue = (value: any, rule: ValidationRule): ValidationResult => {
  const errors: string[] = [];

  switch (rule.rule_type) {
    case 'required':
      if (!value) {
        errors.push('This field is required');
      }
      break;
    case 'min_length':
      if (value.length < rule.configuration.min) {
        errors.push(`Minimum length is ${rule.configuration.min}`);
      }
      break;
    case 'max_length':
      if (value.length > rule.configuration.max) {
        errors.push(`Maximum length is ${rule.configuration.max}`);
      }
      break;
    case 'pattern':
      if (!new RegExp(rule.configuration.pattern).test(value)) {
        errors.push(rule.configuration.message || 'Invalid format');
      }
      break;
    case 'custom':
      try {
        const fn = new Function('value', rule.configuration.function);
        if (!fn(value)) {
          errors.push(rule.configuration.message || 'Validation failed');
        }
      } catch (error) {
        errors.push('Invalid validation function');
      }
      break;
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};