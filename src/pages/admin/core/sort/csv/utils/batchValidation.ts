import { 
  BatchValidationOptions, 
  BatchValidationResult, 
  ValidationError,
  ValidationConfig 
} from '../types/validation';
import { validateValue } from './customValidation';

export const validateInBatches = async (
  data: any[],
  validationConfig: Record<string, ValidationConfig>,
  options: BatchValidationOptions = {}
): Promise<BatchValidationResult> => {
  const {
    chunkSize = 1000,
    onProgress,
    onError,
    abortSignal
  } = options;

  const result: BatchValidationResult = {
    isValid: true,
    errors: [],
    processedRows: 0,
    totalRows: data.length
  };

  // Process in chunks
  for (let i = 0; i < data.length; i += chunkSize) {
    // Check for abort signal
    if (abortSignal?.aborted) {
      throw new Error('Validation aborted');
    }

    const chunk = data.slice(i, i + chunkSize);
    const chunkErrors: ValidationError[] = [];

    // Validate chunk
    chunk.forEach((row, index) => {
      const rowIndex = i + index;
      Object.entries(validationConfig).forEach(([field, config]) => {
        const validationResult = validateValue(row[field], config, row);
        if (!validationResult.isValid) {
          chunkErrors.push({
            row: rowIndex,
            field,
            value: row[field],
            errors: validationResult.errors
          });
        }
      });
    });

    // Update progress
    result.processedRows += chunk.length;
    result.errors.push(...chunkErrors);
    
    if (chunkErrors.length > 0) {
      result.isValid = false;
      onError?.(chunkErrors);
    }

    // Report progress
    const progress = (result.processedRows / result.totalRows) * 100;
    onProgress?.(progress);

    // Allow UI to update
    await new Promise(resolve => setTimeout(resolve, 0));
  }

  return result;
};