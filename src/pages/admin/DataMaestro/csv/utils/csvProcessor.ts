import Papa from 'papaparse';
import { supabase } from "@/integrations/supabase/client";

export interface ProcessedData {
  data: any[];
  errors: string[];
  fields: string[];
}

// Type for valid table names in our database
type ValidTables = 'base_product' | 'bearings' | 'extruders' | 'addons' | 'sensors' | 'build_plates' | 'cooling_systems' | 'endstops' | 'filaments' | 'firmware';

export const processCSVFile = async (file: File): Promise<ProcessedData> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve({
          data: results.data,
          errors: results.errors.map(err => err.message),
          fields: results.meta.fields || []
        });
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

export const validateDataTypes = (data: any[], schema: Record<string, string>) => {
  const errors: { row: number; field: string; message: string }[] = [];
  
  data.forEach((row, index) => {
    Object.entries(schema).forEach(([field, type]) => {
      const value = row[field];
      if (!validateFieldType(value, type)) {
        errors.push({
          row: index,
          field,
          message: `Invalid ${type} value: ${value}`
        });
      }
    });
  });
  
  return errors;
};

const validateFieldType = (value: any, type: string): boolean => {
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

export const insertProcessedData = async (
  tableName: ValidTables,
  data: any[],
  onProgress?: (progress: number) => void
) => {
  const batchSize = 100;
  const totalBatches = Math.ceil(data.length / batchSize);
  const results = {
    success: 0,
    errors: [] as any[]
  };

  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    try {
      const { error } = await supabase
        .from(tableName)
        .insert(batch);

      if (error) {
        results.errors.push(error);
      } else {
        results.success += batch.length;
      }

      if (onProgress) {
        onProgress((i + batch.length) / data.length * 100);
      }
    } catch (error) {
      results.errors.push(error);
    }
  }

  return results;
};