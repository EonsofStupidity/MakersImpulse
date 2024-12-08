import { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ValidationContextType {
  validateField: (value: any, rules: any) => string[];
  validateData: (data: any, rules: any) => Promise<boolean>;
  loadValidationRules: (templateId: string) => Promise<void>;
  rules: Record<string, any>;
}

interface ValidationProviderProps {
  children: ReactNode;
}

const ValidationContext = createContext<ValidationContextType | undefined>(undefined);

export const ValidationProvider = ({ children }: ValidationProviderProps) => {
  const [rules, setRules] = useState<Record<string, any>>({});
  const { toast } = useToast();

  const loadValidationRules = async (templateId: string) => {
    try {
      const { data, error } = await supabase
        .from('unified_validation_rules')
        .select(`
          id,
          name,
          rule_type,
          configuration,
          template_validation_mappings!inner(
            configuration_override
          )
        `)
        .eq('template_validation_mappings.template_id', templateId);

      if (error) throw error;

      const processedRules = (data || []).reduce<Record<string, any>>((acc, rule) => {
        if (typeof rule === 'object' && rule !== null) {
          const mappings = rule.template_validation_mappings?.[0]?.configuration_override || {};
          const configuration = typeof rule.configuration === 'object' ? rule.configuration : {};
          const mappingsObj = typeof mappings === 'object' ? mappings : {};
          
          return {
            ...acc,
            [rule.id]: {
              ...rule,
              configuration: {
                ...configuration,
                ...mappingsObj
              }
            }
          };
        }
        return acc;
      }, {});

      setRules(processedRules);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load validation rules",
        variant: "destructive"
      });
    }
  };

  const validateField = (value: any, rules: any): string[] => {
    const errors: string[] = [];

    if (rules.required && !value) {
      errors.push("This field is required");
    }

    if (rules.minLength && value.length < rules.minLength) {
      errors.push(`Minimum length is ${rules.minLength}`);
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      errors.push(`Maximum length is ${rules.maxLength}`);
    }

    if (rules.pattern && !new RegExp(rules.pattern).test(value)) {
      errors.push("Invalid format");
    }

    return errors;
  };

  const validateData = async (data: any, rules: any): Promise<boolean> => {
    let isValid = true;
    const errors: string[] = [];

    Object.entries(rules).forEach(([field, fieldRules]) => {
      const fieldErrors = validateField(data[field], fieldRules);
      if (fieldErrors.length > 0) {
        isValid = false;
        errors.push(...fieldErrors);
      }
    });

    if (!isValid) {
      toast({
        title: "Validation Error",
        description: errors.join(", "),
        variant: "destructive"
      });
    }

    return isValid;
  };

  return (
    <ValidationContext.Provider value={{
      validateField,
      validateData,
      loadValidationRules,
      rules
    }}>
      {children}
    </ValidationContext.Provider>
  );
};

export const useValidation = () => {
  const context = useContext(ValidationContext);
  if (!context) {
    throw new Error('useValidation must be used within a ValidationProvider');
  }
  return context;
};