import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus } from "lucide-react";

interface Action {
  type: string;
  target: string;
  value: string;
}

interface ActionEditorProps {
  actions: Action[];
  onChange: (actions: Action[]) => void;
}

export const ActionEditor = ({ actions, onChange }: ActionEditorProps) => {
  const addAction = () => {
    onChange([...actions, { type: "set", target: "", value: "" }]);
  };

  const removeAction = (index: number) => {
    const newActions = actions.filter((_, i) => i !== index);
    onChange(newActions);
  };

  const updateAction = (index: number, field: keyof Action, value: string) => {
    const newActions = actions.map((action, i) => {
      if (i === index) {
        return { ...action, [field]: value };
      }
      return action;
    });
    onChange(newActions);
  };

  return (
    <div className="space-y-4">
      {actions.map((action, index) => (
        <div key={index} className="flex items-center gap-2">
          <Select
            value={action.type}
            onValueChange={(value) => updateAction(index, "type", value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="set">Set value</SelectItem>
              <SelectItem value="transform">Transform</SelectItem>
              <SelectItem value="format">Format</SelectItem>
              <SelectItem value="calculate">Calculate</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Target field"
            value={action.target}
            onChange={(e) => updateAction(index, "target", e.target.value)}
            className="flex-1"
          />
          <Input
            placeholder="Value/Expression"
            value={action.value}
            onChange={(e) => updateAction(index, "value", e.target.value)}
            className="flex-1"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeAction(index)}
            className="text-destructive"
          >
            <Minus className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button variant="outline" onClick={addAction} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Action
      </Button>
    </div>
  );
};