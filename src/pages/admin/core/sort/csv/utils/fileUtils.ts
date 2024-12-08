import { detectDelimiter } from './delimiterDetection';
import { detectEncoding } from './encodingDetection';
import { processCSV, processJSON, processExcel } from './fileProcessors';
import { validateDataTypes, validateInBatches } from './validation';
import type { BatchValidationOptions } from '../types/validation';

export {
  detectDelimiter,
  detectEncoding,
  processCSV,
  processJSON,
  processExcel,
  validateDataTypes,
  validateInBatches
};

export const processFile = async (
  file: File,
  options?: BatchValidationOptions
): Promise<{ data: any[], fields: string[] }> => {
  const fileType = file.name.split('.').pop()?.toLowerCase();

  switch (fileType) {
    case 'csv':
      const text = await file.text();
      const delimiter = detectDelimiter(text);
      return processCSV(file, delimiter);
    case 'json':
      return processJSON(file);
    case 'xlsx':
    case 'xls':
      return processExcel(file);
    default:
      throw new Error('Unsupported file type');
  }
};