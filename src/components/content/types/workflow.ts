import { Json } from "@/integrations/supabase/types";

export interface WorkflowStep {
  id: string;
  name: string;
  type: string;
  config: Record<string, unknown>;
}

export interface WorkflowFormData {
  name: string;
  description: string;
  steps: WorkflowStep[];
}

export interface WorkflowData {
  id: string;
  name: string;
  description: string | null;
  steps: Json;
  triggers?: Json;
  created_by?: string;
  updated_at?: string;
}

export interface ParsedWorkflowData extends Omit<WorkflowData, 'steps'> {
  steps: WorkflowStep[];
}