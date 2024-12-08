export interface ImportConfig {
  name: string;
  table_name: string;
  primary_fields: any[];
  secondary_fields: any[];
  validation_rules: Record<string, any>;
  delimiter: string;
  encoding: string;
  min_primary_fields: number;
  null_threshold: number;
  auto_generate_tags: boolean;
  allow_duplicates: boolean;
}

export interface ImportSession {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  file_name: string;
  original_data: any;
  processed_data: any;
  column_mappings: Record<string, string>;
  validation_errors: Array<{
    row: number;
    field: string;
    message: string;
  }>;
  target_table: string;
  row_count: number;
  processed_count: number;
  error_count: number;
}

export interface ImportTemplate {
  id: string;
  name: string;
  target_table: string;
  column_mappings: Record<string, string>;
  validation_rules: Record<string, any>;
  created_by: string;
  created_at: string;
  updated_at: string;
}