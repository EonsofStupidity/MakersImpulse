import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus } from "lucide-react";
import { TransformationCondition } from "@/lib/transformations/types";

interface ConditionEditorProps {
  conditions: TransformationCondition[];
  onChange: (conditions: TransformationCondition[]) => void;
}

export const ConditionEditor = ({ conditions, onChange }: ConditionEditorProps) => {
  const addCondition = () => {
    onChange([...conditions, { field: "", operator: "equals", value: "" }]);
  };

  const removeCondition = (index: number) => {
    const newConditions = conditions.filter((_, i) => i !== index);
    onChange(newConditions);
  };

  const updateCondition = (index: number, field: keyof TransformationCondition, value: string) => {
    const newConditions = conditions.map((condition, i) => {
      if (i === index) {
        return { 
          ...condition, 
          [field]: field === 'operator' 
            ? value as TransformationCondition['operator']
            : value 
        };
      }
      return condition;
    });
    onChange(newConditions);
  };

  return (
    <div className="space-y-4">
      {conditions.map((condition, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            placeholder="Field name"
            value={condition.field}
            onChange={(e) => updateCondition(index, "field", e.target.value)}
            className="flex-1"
          />
          <Select
            value={condition.operator}
            onValueChange={(value) => updateCondition(index, "operator", value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="equals">Equals</SelectItem>
              <SelectItem value="contains">Contains</SelectItem>
              <SelectItem value="startsWith">Starts with</SelectItem>
              <SelectItem value="endsWith">Ends with</SelectItem>
              <SelectItem value="greaterThan">Greater than</SelectItem>
              <SelectItem value="lessThan">Less than</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Value"
            value={condition.value}
            onChange={(e) => updateCondition(index, "value", e.target.value)}
            className="flex-1"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeCondition(index)}
            className="text-destructive"
          >
            <Minus className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button variant="outline" onClick={addCondition} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Condition
      </Button>
    </div>
  );
};