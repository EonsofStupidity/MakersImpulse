import { ThemeBase } from './types';

export interface ThemeValidationRule {
  field: keyof ThemeBase;
  validator: (value: any) => boolean;
  message: string;
}

export interface ThemeValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
}