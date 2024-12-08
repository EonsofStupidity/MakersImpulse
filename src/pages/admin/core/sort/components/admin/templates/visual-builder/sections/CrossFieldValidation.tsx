import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Trash } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CrossFieldValidationProps {
  template: any;
  onSave: (updates: any) => Promise<void>;
}

export const CrossFieldValidation = ({ template, onSave }: CrossFieldValidationProps) => {
  const [rules, setRules] = useState<any[]>(template?.cross_field_validations || []);
  const [availableFields, setAvailableFields] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Get all mapped fields from the template
    const fields = Object.values(template?.field_mappings || {});
    setAvailableFields(fields as string[]);
  }, [template]);

  const handleAddRule = () => {
    setRules([...rules, {
      id: crypto.randomUUID(),
      field1: "",
      field2: "",
      operator: "equals",
      customLogic: ""
    }]);
  };

  const handleRemoveRule = (ruleId: string) => {
    setRules(rules.filter(r => r.id !== ruleId));
  };

  const handleUpdateRule = (ruleId: string, updates: any) => {
    setRules(rules.map(r => r.id === ruleId ? { ...r, ...updates } : r));
  };

  const handleSaveRules = async () => {
    try {
      await onSave({
        cross_field_validations: rules,
        updated_at: new Date().toISOString()
      });
      
      toast({
        title: "Success",
        description: "Cross-field validation rules saved successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save cross-field validation rules",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Cross-field Validation Rules</h3>
        <Button onClick={handleAddRule} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Rule
        </Button>
      </div>

      {rules.map((rule) => (
        <Card key={rule.id} className="p-4 space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <Select
              value={rule.field1}
              onValueChange={(value) => handleUpdateRule(rule.id, { field1: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select first field" />
              </SelectTrigger>
              <SelectContent>
                {availableFields.map((field) => (
                  <SelectItem key={field} value={field}>
                    {field}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={rule.operator}
              onValueChange={(value) => handleUpdateRule(rule.id, { operator: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select operator" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equals">Equals</SelectItem>
                <SelectItem value="not_equals">Not Equals</SelectItem>
                <SelectItem value="greater_than">Greater Than</SelectItem>
                <SelectItem value="less_than">Less Than</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={rule.field2}
              onValueChange={(value) => handleUpdateRule(rule.id, { field2: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select second field" />
              </SelectTrigger>
              <SelectContent>
                {availableFields.map((field) => (
                  <SelectItem key={field} value={field}>
                    {field}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveRule(rule.id)}
              className="text-destructive"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>

          <Input
            placeholder="Custom validation logic (optional)"
            value={rule.customLogic}
            onChange={(e) => handleUpdateRule(rule.id, { customLogic: e.target.value })}
          />
        </Card>
      ))}

      <div className="flex justify-end">
        <Button onClick={handleSaveRules}>
          Save Rules
        </Button>
      </div>
    </div>
  );
};