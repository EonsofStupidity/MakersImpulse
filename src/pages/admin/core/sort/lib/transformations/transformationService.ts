import { supabase } from '@/integrations/supabase/client';
import { TransformationRule, TransformationType, TransformationResult } from './types';
import { Json } from '@/types/builder';

export const transformationService = {
  async saveRule(rule: TransformationRule): Promise<TransformationRule> {
    const { data, error } = await supabase
      .from('transformation_rules')
      .insert({
        name: rule.name,
        description: rule.description,
        rule_type: rule.rule_type,
        configuration: rule.configuration as unknown as Json,
        script: rule.script
      })
      .select()
      .single();

    if (error) throw error;
    return {
      ...data,
      rule_type: data.rule_type as TransformationType,
      configuration: data.configuration as unknown as { 
        conditions: TransformationRule['configuration']['conditions'],
        actions: TransformationRule['configuration']['actions']
      }
    };
  },

  async getRules(): Promise<TransformationRule[]> {
    const { data, error } = await supabase
      .from('transformation_rules')
      .select('*');

    if (error) throw error;
    return data.map(rule => ({
      ...rule,
      rule_type: rule.rule_type as TransformationType,
      configuration: rule.configuration as unknown as { 
        conditions: TransformationRule['configuration']['conditions'],
        actions: TransformationRule['configuration']['actions']
      }
    }));
  },

  executeTransformation(rule: TransformationRule, value: any): TransformationResult {
    try {
      let result = value;

      if (rule.script) {
        const transformFn = new Function('value', rule.script);
        result = transformFn(value);
      } else {
        // Apply conditions and actions from configuration
        const { conditions, actions } = rule.configuration;
        
        // Check conditions
        const conditionsMet = conditions.every(condition => {
          switch (condition.operator) {
            case 'equals':
              return value === condition.value;
            case 'contains':
              return String(value).includes(condition.value);
            case 'startsWith':
              return String(value).startsWith(condition.value);
            case 'endsWith':
              return String(value).endsWith(condition.value);
            case 'greaterThan':
              return Number(value) > Number(condition.value);
            case 'lessThan':
              return Number(value) < Number(condition.value);
            default:
              return true;
          }
        });

        if (conditionsMet) {
          // Apply actions
          for (const action of actions) {
            switch (action.type) {
              case 'set':
                result = action.value;
                break;
              case 'transform':
                // Add custom transformation logic
                break;
              case 'format':
                // Add formatting logic
                break;
              case 'calculate':
                // Add calculation logic
                break;
            }
          }
        }
      }

      return { success: true, value: result };
    } catch (error) {
      return { 
        success: false, 
        value: value,
        error: error instanceof Error ? error.message : 'Transformation failed'
      };
    }
  }
};