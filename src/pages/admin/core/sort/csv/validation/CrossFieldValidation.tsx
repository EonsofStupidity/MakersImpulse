import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface CrossFieldValidationProps {
  sourceFields: string[];
  targetFields: string[];
  onValidationChange: (rules: CrossFieldRule[]) => void;
}

interface CrossFieldRule {
  field1: string;
  field2: string;
  operator: "equals" | "notEquals" | "greaterThan" | "lessThan";
  customLogic?: string;
}

export const CrossFieldValidation = ({
  sourceFields,
  targetFields,
  onValidationChange,
}: CrossFieldValidationProps) => {
  const [rules, setRules] = useState<CrossFieldRule[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadExistingRules();
  }, []);

  const loadExistingRules = async () => {
    try {
      const { data, error } = await supabase
        .from('cross_field_validation_rules')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (data) {
        const formattedRules = data.map(rule => ({
          field1: rule.field1,
          field2: rule.field2,
          operator: rule.operator as CrossFieldRule['operator'],
          customLogic: rule.custom_logic
        }));
        setRules(formattedRules);
        onValidationChange(formattedRules);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load validation rules",
        variant: "destructive"
      });
    }
  };

  const addRule = () => {
    const newRule: CrossFieldRule = {
      field1: "",
      field2: "",
      operator: "equals"
    };
    setRules([...rules, newRule]);
    onValidationChange([...rules, newRule]);
  };

  const updateRule = (index: number, updates: Partial<CrossFieldRule>) => {
    const newRules = rules.map((rule, i) => 
      i === index ? { ...rule, ...updates } : rule
    );
    setRules(newRules);
    onValidationChange(newRules);
  };

  const removeRule = (index: number) => {
    const newRules = rules.filter((_, i) => i !== index);
    setRules(newRules);
    onValidationChange(newRules);
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Cross-Field Validation Rules</h3>
        <Button onClick={addRule} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Rule
        </Button>
      </div>

      <div className="space-y-4">
        {rules.map((rule, index) => (
          <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
            <Select
              value={rule.field1}
              onValueChange={(value) => updateRule(index, { field1: value })}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select field" />
              </SelectTrigger>
              <SelectContent>
                {sourceFields.map((field) => (
                  <SelectItem key={field} value={field}>
                    {field}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={rule.operator}
              onValueChange={(value) => updateRule(index, { 
                operator: value as CrossFieldRule['operator']
              })}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Operator" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equals">Equals</SelectItem>
                <SelectItem value="notEquals">Not Equals</SelectItem>
                <SelectItem value="greaterThan">Greater Than</SelectItem>
                <SelectItem value="lessThan">Less Than</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={rule.field2}
              onValueChange={(value) => updateRule(index, { field2: value })}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select field" />
              </SelectTrigger>
              <SelectContent>
                {targetFields.map((field) => (
                  <SelectItem key={field} value={field}>
                    {field}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Custom logic (optional)"
              value={rule.customLogic || ""}
              onChange={(e) => updateRule(index, { customLogic: e.target.value })}
              className="flex-1"
            />

            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeRule(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};