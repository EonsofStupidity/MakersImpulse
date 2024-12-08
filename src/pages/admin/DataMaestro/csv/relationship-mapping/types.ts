import { Node, Edge } from 'reactflow';
import { Json } from "@/types/builder";

export interface RelationshipVisualizerProps {
  tables: {
    name: string;
    fields: string[];
    isPrimary?: boolean;
  }[];
  relationships: {
    source: string;
    target: string;
    type: 'one-to-one' | 'one-to-many' | 'many-to-many';
  }[];
  onRelationshipChange: (relationships: any[]) => void;
  tableName?: string;
}

export interface VisualizationData {
  nodes: {
    id: string;
    type: string;
    data: {
      label: string;
      fields: string[];
      isPrimary?: boolean;
    };
    position: {
      x: number;
      y: number;
    };
  }[];
  edges: {
    id: string;
    source: string;
    target: string;
    label?: string;
    animated?: boolean;
    type?: string;
  }[];
}

export interface SerializedVisualizationData {
  nodes: Array<{
    id: string;
    type: string;
    data: {
      label: string;
      fields: string[];
      isPrimary?: boolean;
    };
    position: {
      x: number;
      y: number;
    };
  }>;
  edges: Array<{
    id: string;
    source: string;
    target: string;
    label?: string;
    animated?: boolean;
    type?: string;
  }>;
}