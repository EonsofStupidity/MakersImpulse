export type CompatibilityStatus = 'compatible' | 'needs_conversion' | 'incompatible';

export interface MappedField {
  sourceField: string;
  targetField: string;
  compatibilityStatus?: CompatibilityStatus;
}

export interface FieldMappingProps {
  sourceFields: string[];
  targetFields: string[];
  mappings: Record<string, string>;
  onUpdateMapping: (mappings: Record<string, string>) => void;
  requiredFields?: string[];
}