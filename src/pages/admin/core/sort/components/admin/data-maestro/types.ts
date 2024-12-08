export interface ImportConfig {
  tableName: string;
  relationships: Array<{
    source: string;
    target: string;
    type: 'one-to-one' | 'one-to-many' | 'many-to-many';
  }>;
  tags: string[];
  validationRules: Record<string, any>;
  primaryFields: string[];
  secondaryFields: string[];
  nullThreshold: number;
  format: 'csv' | 'json' | 'xlsx' | 'xml';
  formatSettings: {
    delimiter?: string;
    hasHeader?: boolean;
    isArray?: boolean;
    encoding?: string;
    sheet?: string;
    rootElement?: string;
  };
}

export interface ImportSession {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  file_name: string;
  original_data: any;
  processed_data: any;
  column_mappings: Record<string, string>;
  validation_errors: any[];
  target_table: string;
  row_count: number | null;
  processed_count: number;
  error_count: number;
}