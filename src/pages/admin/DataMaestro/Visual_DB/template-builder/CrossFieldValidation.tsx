import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";

interface CrossFieldValidationProps {
  fields: string[];
  onValidationChange: (rules: CrossFieldRule[]) => void;
}

interface CrossFieldRule {
  field1: string;
  field2: string;
  operator: "equals" | "notEquals" | "greaterThan" | "lessThan";
  customLogic?: string;
}

export const CrossFieldValidation = ({
  fields,
  onValidationChange,
}: CrossFieldValidationProps) => {
  const [rules, setRules] = useState<CrossFieldRule[]>([]);

  const addRule = () => {
    setRules([
      ...rules,
      { field1: "", field2: "", operator: "equals" }
    ]);
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
                {fields.map((field) => (
                  <SelectItem key={field} value={field}>
                    {field}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={rule.operator}
              onValueChange={(value) => updateRule(index, { 
                operator: value as "equals" | "notEquals" | "greaterThan" | "lessThan" 
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
                {fields.map((field) => (
                  <SelectItem key={field} value={field}>
                    {field}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

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