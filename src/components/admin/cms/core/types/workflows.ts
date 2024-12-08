import { BaseEntity } from './base';

export interface CMSWorkflow extends BaseEntity {
  name: string;
  description: string | null;
  steps: Record<string, any>;
  triggers: Record<string, any>[];
}

export interface WorkflowStep {
  id: string;
  type: string;
  config: Record<string, any>;
  next?: string[];
}

export interface WorkflowTrigger {
  event: string;
  conditions: Record<string, any>[];
}