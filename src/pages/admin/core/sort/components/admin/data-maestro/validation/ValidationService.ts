import { ValidationRule, ValidationResult } from './types';

export class ValidationService {
  private rules: Map<string, ValidationRule[]> = new Map();

  addRule(field: string, rule: ValidationRule) {
    const fieldRules = this.rules.get(field) || [];
    this.rules.set(field, [...fieldRules, rule]);
  }

  removeRule(field: string, ruleId: string) {
    const fieldRules = this.rules.get(field) || [];
    this.rules.set(
      field,
      fieldRules.filter(rule => rule.id !== ruleId)
    );
  }

  validateField(field: string, value: any): ValidationResult {
    const fieldRules = this.rules.get(field) || [];
    const errors: string[] = [];

    for (const rule of fieldRules) {
      if (!this.evaluateRule(rule, value)) {
        errors.push(rule.errorMessage || 'Validation failed');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private evaluateRule(rule: ValidationRule, value: any): boolean {
    switch (rule.type) {
      case 'required':
        return value !== undefined && value !== null && value !== '';
      case 'minLength':
        return !value || String(value).length >= (rule.params?.min || 0);
      case 'maxLength':
        return !value || String(value).length <= (rule.params?.max || 0);
      case 'pattern':
        return !value || new RegExp(rule.params?.pattern || '').test(String(value));
      case 'custom':
        if (rule.params?.validate) {
          try {
            return rule.params.validate(value);
          } catch (error) {
            console.error('Custom validation error:', error);
            return false;
          }
        }
        return true;
      default:
        return true;
    }
  }

  getRules(field: string): ValidationRule[] {
    return this.rules.get(field) || [];
  }

  getAllRules(): Map<string, ValidationRule[]> {
    return new Map(this.rules);
  }

  clearRules(field?: string) {
    if (field) {
      this.rules.delete(field);
    } else {
      this.rules.clear();
    }
  }
}

export const validationService = new ValidationService();