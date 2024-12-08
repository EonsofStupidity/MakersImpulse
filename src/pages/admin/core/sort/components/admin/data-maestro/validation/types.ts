export interface ValidationRule {
  id?: string;
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  errorMessage?: string;
  params?: {
    min?: number;
    max?: number;
    pattern?: string;
    validate?: (value: any) => boolean;
  };
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}