export interface CMSContent {
  id: string;
  type: 'page' | 'component' | 'template' | 'workflow';
  title: string;
  slug: string | null;
  content: Record<string, any>;
  metadata: Record<string, any>;
  status: 'draft' | 'published' | 'archived';
  version: number;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CMSComponent {
  id: string;
  name: string;
  description: string | null;
  component_type: string;
  props_schema: Record<string, any>;
  default_props: Record<string, any>;
  created_by: string | null;
  updated_at: string;
}

export interface CMSWorkflow {
  id: string;
  name: string;
  description: string | null;
  steps: Record<string, any>;
  triggers: Record<string, any>[];
  created_by: string | null;
  updated_at: string;
}

export interface CMSRelationship {
  id: string;
  parent_id: string;
  child_id: string;
  relationship_type: string;
  order_index: number;
}