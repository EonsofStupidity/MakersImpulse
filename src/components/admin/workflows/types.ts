import { Json } from "@/integrations/supabase/types";

export type WorkflowStageType = 'approval' | 'review' | 'task' | 'notification' | 'conditional';

export interface StageValidationRule {
  field: string;
  type: 'required' | 'min' | 'max' | 'pattern' | 'custom';
  value?: any;
  message?: string;
}

export interface WorkflowStageConfig {
  timeLimit?: number;
  requiredApprovers?: number;
  customFields?: {
    name: string;
    type: 'text' | 'number' | 'date' | 'select';
    options?: string[];
    required?: boolean;
  }[];
  autoAssignment?: {
    type: 'user' | 'role' | 'group';
    value: string;
  };
  notifications?: {
    onStart?: boolean;
    onComplete?: boolean;
    reminderInterval?: number;
  };
}

export interface WorkflowStage {
  id: string;
  name: string;
  description?: string;
  type: WorkflowStageType;
  order: number;
  config: WorkflowStageConfig;
  validationRules?: StageValidationRule[];
}

export interface WorkflowTemplate {
  id?: string;
  name: string;
  description: string | null;
  stages: WorkflowStage[];
  is_active: boolean;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
}

export interface WorkflowFormData {
  name: string;
  description: string;
  stages: WorkflowStage[];
  is_active: boolean;
}

export const serializeStages = (stages: WorkflowStage[]): Json => {
  return JSON.parse(JSON.stringify(stages)) as Json;
};

export const parseStages = (stages: Json): WorkflowStage[] => {
  if (!Array.isArray(stages)) return [];
  return stages.map((stage: any) => ({
    id: stage.id || crypto.randomUUID(),
    name: stage.name || '',
    description: stage.description || '',
    type: stage.type || 'task',
    order: stage.order || 0,
    config: stage.config || {},
    validationRules: stage.validationRules || []
  }));
};