import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export const processCSV = async (file: File, delimiter: string): Promise<{ data: any[], fields: string[] }> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      delimiter,
      skipEmptyLines: true,
      encoding: 'UTF-8',
      complete: (results) => {
        resolve({
          data: results.data,
          fields: results.meta.fields || []
        });
      },
      error: reject
    });
  });
};

export const processJSON = async (file: File): Promise<{ data: any[], fields: string[] }> => {
  try {
    const text = await file.text();
    const json = JSON.parse(text);
    const data = Array.isArray(json) ? json : [json];
    
    const fields = Array.from(new Set(
      data.flatMap(obj => Object.keys(obj))
    ));

    const normalizedData = data.map(obj => {
      const normalized: any = {};
      fields.forEach(field => {
        normalized[field] = obj[field] || null;
      });
      return normalized;
    });

    return { data: normalizedData, fields };
  } catch (error) {
    throw new Error('Invalid JSON file');
  }
};

export const processExcel = async (file: File): Promise<{ data: any[], fields: string[] }> => {
  try {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    if (data.length < 2) {
      throw new Error('Excel file must contain headers and at least one row of data');
    }

    const fields = data[0] as string[];
    const rows = data.slice(1).map(row => {
      const obj: any = {};
      fields.forEach((field, index) => {
        obj[field] = (row as any[])[index] || null;
      });
      return obj;
    });

    return { data: rows, fields };
  } catch (error) {
    throw new Error('Invalid Excel file');
  }
};