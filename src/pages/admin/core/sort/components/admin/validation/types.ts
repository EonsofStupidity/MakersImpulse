export interface Condition {
  id: string;
  field: string;
  operator: string;
  value: string;
  logicOperator?: 'AND' | 'OR';
}

export interface ValidationRule {
  name: string;
  description?: string;
  conditions: Condition[];
  groupId?: string;
  customLogic?: string;
}