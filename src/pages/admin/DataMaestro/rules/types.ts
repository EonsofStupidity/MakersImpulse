import { Json } from "@/types/builder";

// Using string union type instead of trying to create a new enum type
export type ValidationRuleType = "required" | "min_length" | "max_length" | "pattern" | "allowed_chars" | "data_type";

export interface ValidationRule {
  id?: string;
  name: string;
  rule_type: ValidationRuleType;
  configuration?: Json;
  description?: string;
  is_active?: boolean;
  template_id?: string;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}