import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ValidationRuleType } from '@/components/admin/components/types';
import { Json } from '@/types/builder';

export interface ValidationRule {
  id?: string;
  name: string;
  rule_type: ValidationRuleType;
  configuration?: Record<string, any>;
  description?: string;
  is_active?: boolean;
  template_id?: string;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  dependency_chain?: string[];
  is_global?: boolean;
}

interface UnifiedValidationRuleResponse {
  id: string;
  name: string;
  rule_type: string;
  configuration: Json;
  description: string;
  is_active: boolean;
  template_id: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  dependency_chain: string[] | null;
  is_global: boolean;
  template_validation_mappings: {
    configuration_override: Json | null;
  }[];
}

export const useUnifiedValidation = () => {
  const [rules, setRules] = useState<ValidationRule[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadRules = async (templateId?: string) => {
    try {
      setLoading(true);
      const query = supabase
        .from('unified_validation_rules')
        .select(`
          *,
          template_validation_mappings!inner(
            configuration_override
          )
        `);

      if (templateId) {
        query.eq('template_validation_mappings.template_id', templateId);
      }

      const { data, error } = await query;

      if (error) throw error;

      const convertedRules: ValidationRule[] = (data || []).map((rule: UnifiedValidationRuleResponse) => ({
        id: rule.id,
        name: rule.name,
        rule_type: rule.rule_type as ValidationRuleType,
        configuration: rule.configuration as Record<string, any>,
        description: rule.description,
        is_active: rule.is_active,
        template_id: rule.template_id || undefined,
        created_by: rule.created_by || undefined,
        created_at: rule.created_at,
        updated_at: rule.updated_at,
        dependency_chain: rule.dependency_chain || undefined,
        is_global: rule.is_global
      }));

      setRules(convertedRules);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load validation rules",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const validateValue = (value: any, rule: ValidationRule): { isValid: boolean; error?: string } => {
    try {
      const { rule_type, configuration } = rule;

      switch (rule_type) {
        case 'required':
          if (!value && value !== 0) {
            return { isValid: false, error: configuration?.message || 'This field is required' };
          }
          break;

        case 'min_length':
          if (value && value.length < configuration?.min) {
            return { isValid: false, error: `Minimum length is ${configuration?.min}` };
          }
          break;

        case 'max_length':
          if (value && value.length > configuration?.max) {
            return { isValid: false, error: `Maximum length is ${configuration?.max}` };
          }
          break;

        case 'pattern':
          if (value && !new RegExp(configuration?.pattern).test(value)) {
            return { isValid: false, error: configuration?.message || 'Invalid format' };
          }
          break;

        case 'custom':
          if (configuration?.function) {
            const fn = new Function('value', configuration.function);
            if (!fn(value)) {
              return { isValid: false, error: configuration?.message || 'Validation failed' };
            }
          }
          break;
      }

      return { isValid: true };
    } catch (error) {
      console.error('Validation error:', error);
      return { isValid: false, error: 'Validation error occurred' };
    }
  };

  const validateField = (value: any, fieldRules: ValidationRule[]): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    for (const rule of fieldRules) {
      const result = validateValue(value, rule);
      if (!result.isValid && result.error) {
        errors.push(result.error);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  return {
    rules,
    loading,
    loadRules,
    validateField,
    validateValue
  };
};