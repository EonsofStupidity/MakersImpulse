import { BaseEntity } from './base';

export interface CMSRelationship extends BaseEntity {
  parent_id: string;
  child_id: string;
  relationship_type: string;
  order_index: number;
}

export interface RelatedContent {
  id: string;
  title: string;
  type: string;
  relationship_type: string;
}