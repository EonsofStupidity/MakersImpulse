import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Trash } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ValidationRulesSectionProps {
  template: any;
  onSave: (updates: any) => Promise<void>;
}

export const ValidationRulesSection = ({ template, onSave }: ValidationRulesSectionProps) => {
  const [rules, setRules] = useState<any[]>(template?.validation_rules || []);
  const { toast } = useToast();

  const handleAddRule = () => {
    setRules([...rules, {
      id: crypto.randomUUID(),
      type: "required",
      field: "",
      value: ""
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
        validation_rules: rules,
        updated_at: new Date().toISOString()
      });
      
      toast({
        title: "Success",
        description: "Validation rules saved successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save validation rules",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Validation Rules</h3>
        <Button onClick={handleAddRule} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Rule
        </Button>
      </div>

      {rules.map((rule) => (
        <Card key={rule.id} className="p-4 space-y-4">
          <div className="flex items-center gap-4">
            <Select
              value={rule.type}
              onValueChange={(value) => handleUpdateRule(rule.id, { type: value })}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select rule type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="required">Required</SelectItem>
                <SelectItem value="min_length">Minimum Length</SelectItem>
                <SelectItem value="max_length">Maximum Length</SelectItem>
                <SelectItem value="pattern">Pattern Match</SelectItem>
                <SelectItem value="data_type">Data Type</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Field name"
              value={rule.field}
              onChange={(e) => handleUpdateRule(rule.id, { field: e.target.value })}
              className="flex-1"
            />

            {rule.type !== 'required' && (
              <Input
                placeholder="Value"
                value={rule.value}
                onChange={(e) => handleUpdateRule(rule.id, { value: e.target.value })}
                className="flex-1"
              />
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveRule(rule.id)}
              className="text-destructive"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
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