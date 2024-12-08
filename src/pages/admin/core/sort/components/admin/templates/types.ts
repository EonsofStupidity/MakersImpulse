import { Json } from "@/types/builder";

export interface TemplateVersion {
  id: string;
  template_id: string;
  version_number: number;
  content: {
    field_mappings: Record<string, any>;
    validation_rules: Record<string, any>;
    metadata: Record<string, any>;
  };
  metadata: Record<string, any>;
  created_at: string;
  created_by: string;
  is_current: boolean;
}

export interface Template {
  id?: string;
  name: string;
  description: string;
  is_public: boolean;
  version: number;
  status?: 'draft' | 'published' | 'archived';
  field_mappings: Record<string, any>;
  validation_rules: Record<string, any>;
  metadata: Record<string, any>;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
}

export interface VersionComparisonProps {
  originalContent: string;
  modifiedContent: string;
  onClose: () => void;
}

export interface VersionListProps {
  versions: TemplateVersion[];
  onVersionSelect: (versionId: string) => void;
  selectedVersions: string[];
  onRollback: (versionId: string) => void;
}