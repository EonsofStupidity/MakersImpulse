import { ValidationConfig, ValidationRule, BatchValidationOptions, BatchValidationResult } from '../types/validation';
import { validateValue } from './customValidation';
import { validateInBatches } from './batchValidation';

export const validateFieldType = (value: any, type: string): boolean => {
  if (value === null || value === undefined || value === '') return true;
  
  switch (type.toLowerCase()) {
    case 'number':
      return !isNaN(Number(value));
    case 'date':
      return !isNaN(Date.parse(value));
    case 'boolean':
      return ['true', 'false', '1', '0'].includes(String(value).toLowerCase());
    default:
      return true;
  }
};

export const createTypeValidationRule = (type: string): ValidationRule => ({
  type: 'custom',
  message: `Invalid ${type} value`,
  validate: (value) => validateFieldType(value, type)
});

export const validateDataTypes = async (
  data: any[],
  schema: Record<string, string>,
  options?: BatchValidationOptions
): Promise<BatchValidationResult> => {
  // Convert schema to validation config
  const validationConfig: Record<string, ValidationConfig> = {};
  
  Object.entries(schema).forEach(([field, type]) => {
    validationConfig[field] = {
      rules: [createTypeValidationRule(type)]
    };
  });

  return validateInBatches(data, validationConfig, options);
};

export { validateValue, validateInBatches };
export type { ValidationConfig, ValidationRule, BatchValidationOptions, BatchValidationResult };