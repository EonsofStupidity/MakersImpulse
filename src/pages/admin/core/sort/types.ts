export interface ValidationRule {
  id?: string;
  name: string;
  rule_type: ValidationRuleType;
  configuration?: Record<string, any>;
  description?: string;
  is_active?: boolean;
  template_id?: string;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  dependency_chain?: string[];
  is_global?: boolean;
}

export type ValidationRuleType = 
  | "required" 
  | "min_length" 
  | "max_length" 
  | "pattern" 
  | "allowed_chars" 
  | "data_type"
  | "custom";

export interface ImportPayload {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  file_name: string;
  original_data: any;
  processed_data: any;
  validation_errors: any[];
  target_table: string;
  row_count: number | null;
  processed_count: number;
  error_count: number;
  completed_at?: string;
  created_at: string;
}

import { ImportConfig } from "./vdb/types";

export interface WizardNavigationProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  config: ImportConfig;
  onSubmit: () => void;
  disabled?: boolean;
}

export interface FieldMapping {
  sourceField: string;
  targetField: string;
}

export interface DragDropFieldMappingProps {
  sourceFields: string[];
  targetFields: string[];
  mappings: Record<string, string>;
  onUpdateMapping: (mappings: Record<string, string>) => void;
  requiredFields?: string[];
}
