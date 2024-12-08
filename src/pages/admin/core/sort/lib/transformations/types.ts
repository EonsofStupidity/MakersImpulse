export type TransformationType = 'string_manipulation' | 'date_format' | 'number_format' | 'conditional' | 'custom_script';

export interface TransformationCondition {
  field: string;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan';
  value: string;
}

export interface TransformationAction {
  type: string;
  target: string;
  value: string;
}

export interface TransformationRule {
  id?: string;
  name: string;
  description?: string;
  rule_type: TransformationType;
  configuration: {
    conditions: TransformationCondition[];
    actions: TransformationAction[];
  };
  script?: string;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TransformationResult {
  success: boolean;
  value: any;
  error?: string;
}

export interface TransformationContext {
  rules: TransformationRule[];
  activeRule: TransformationRule | null;
  setActiveRule: (rule: TransformationRule | null) => void;
  createRule: (rule: TransformationRule) => Promise<void>;
  updateRule: (id: string, rule: TransformationRule) => Promise<void>;
  deleteRule: (id: string) => Promise<void>;
  executeTransformation: (value: any, ruleId: string) => Promise<TransformationResult>;
}