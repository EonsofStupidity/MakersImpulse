import { ThemeBase } from './types';

export interface ThemeValidationError {
  field: keyof ThemeBase;
  message: string;
}

export interface ThemeValidationResult {
  isValid: boolean;
  errors: ThemeValidationError[];
}