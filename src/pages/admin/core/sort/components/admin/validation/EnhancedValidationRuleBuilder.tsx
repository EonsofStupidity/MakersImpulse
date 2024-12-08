import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Save, Trash } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ValidationRule } from "../components/types";
import { RuleForm } from "./components/RuleForm";
import { RuleConfiguration } from "./components/RuleConfiguration";
import { DependencyChain } from "./components/DependencyChain";

export const EnhancedValidationRuleBuilder = () => {
  const [rules, setRules] = useState<ValidationRule[]>([]);
  const { toast } = useToast();

  const addRule = () => {
    const newRule: ValidationRule = {
      name: "",
      rule_type: "required",
      configuration: {},
      description: "",
      is_active: true
    };
    setRules([...rules, newRule]);
  };

  const handleSave = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      for (const rule of rules) {
        const { error } = await supabase
          .from('validation_rules')
          .insert({
            name: rule.name,
            rule_type: rule.rule_type,
            configuration: rule.configuration,
            is_active: rule.is_active,
            description: rule.description,
            created_by: user?.id
          });

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Validation rules saved successfully"
      });
      
      setRules([]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save validation rules",
        variant: "destructive"
      });
    }
  };

  const updateRule = (index: number, updates: Partial<ValidationRule>) => {
    const updatedRules = [...rules];
    updatedRules[index] = { ...updatedRules[index], ...updates };
    setRules(updatedRules);
  };

  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Validation Rule Builder</h2>
        <Button onClick={addRule} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Rule
        </Button>
      </div>

      {rules.map((rule, index) => (
        <Card key={index} className="p-6 space-y-6">
          <div className="flex justify-between">
            <div className="flex-1 space-y-6">
              <RuleForm
                rule={rule}
                onUpdate={(updates) => updateRule(index, updates)}
              />

              <RuleConfiguration
                ruleType={rule.rule_type}
                configuration={rule.configuration || {}}
                onUpdate={(config) => updateRule(index, { configuration: config })}
              />

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Dependencies</h3>
                <DependencyChain
                  availableRules={rules.filter((_, i) => i !== index)}
                  selectedDependencies={rule.dependency_chain || []}
                  onUpdate={(deps) => updateRule(index, { dependency_chain: deps })}
                />
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeRule(index)}
              className="text-destructive"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ))}

      {rules.length > 0 && (
        <Button onClick={handleSave} className="w-full flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Rules
        </Button>
      )}
    </div>
  );
};