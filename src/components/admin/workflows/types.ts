import { Json } from "@/integrations/supabase/types";

export interface WorkflowStage {
  id: string;
  name: string;
  description?: string;
  order: number;
  [key: string]: Json | undefined;
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
    order: stage.order || 0
  }));
};