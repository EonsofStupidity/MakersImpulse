import { Json } from "@/types/builder";

export interface CSVImportPreviewProps {
  data: any[];
  onConfirm: () => void;
  onCancel: () => void;
  importType: string;
}

export interface ValidationError {
  row: number;
  errors: string[];
}

export interface ImportPayload {
  status: 'pending' | 'completed' | 'failed';
  id: string;
  [key: string]: any;
}

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
  importId?: string;
}

export interface WizardNavigationProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  config: ImportConfig;
  onSubmit: () => void;
  disabled?: boolean;
}

export interface ImportSession {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  file_name: string;
  original_data: Json;
  processed_data: Json;
  column_mappings: Json;
  validation_errors: Json[];
  target_table: string;
  row_count: number | null;
  processed_count: number;
  error_count: number;
}

export interface ImportDocumentation {
  id: string;
  section: string;
  title: string;
  content: string;
  order_index: number;
}

export interface ImportTemplate {
  id?: string;
  name: string;
  target_table: string;
  column_mappings: Json;
  validation_rules?: Json;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DragDropFieldMappingProps {
  sourceFields: string[];
  targetFields: string[];
  mappings: Record<string, string>;
  onUpdateMapping: (mappings: Record<string, string>) => void;
  requiredFields?: string[];
}