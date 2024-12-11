import { Json } from "@/integrations/supabase/types";

export interface WorkflowStage {
  id: string;
  name: string;
  description?: string;
  order: number;
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

// Helper functions to convert between DB and UI types
export const serializeStages = (stages: WorkflowStage[]): Json => {
  return stages as Json;
};

export const parseStages = (stages: Json): WorkflowStage[] => {
  if (!Array.isArray(stages)) return [];
  return stages.map((stage: any) => ({
    id: stage.id || crypto.randomUUID(),
    name: stage.name || '',
    description: stage.description || '',
    order: stage.order || 0
  }));
};