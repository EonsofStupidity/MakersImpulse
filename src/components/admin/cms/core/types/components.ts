import { BaseEntity, Metadata } from './base';

export interface CMSComponent extends BaseEntity {
  name: string;
  description: string | null;
  component_type: string;
  props_schema: Record<string, any>;
  default_props: Record<string, any>;
}

export interface ComponentPreviewProps {
  component: CMSComponent;
  props?: Record<string, any>;
}