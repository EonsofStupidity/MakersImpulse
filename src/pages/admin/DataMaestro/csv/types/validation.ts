export type ValidationRule = {
  type: 'regex' | 'range' | 'custom' | 'conditional';
  value?: any;
  message?: string;
  validate: (value: any, rowData?: any) => boolean;
};

export type ValidationConfig = {
  required?: boolean;
  rules?: ValidationRule[];
};

export type ValidationResult = {
  isValid: boolean;
  errors: string[];
};

export type BatchValidationOptions = {
  chunkSize?: number;
  onProgress?: (progress: number) => void;
  onError?: (errors: ValidationError[]) => void;
  abortSignal?: AbortSignal;
};

export type ValidationError = {
  row: number;
  field: string;
  value: any;
  errors: string[];
};

export type BatchValidationResult = {
  isValid: boolean;
  errors: ValidationError[];
  processedRows: number;
  totalRows: number;
};