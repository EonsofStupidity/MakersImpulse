import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash } from "lucide-react";
import { Condition } from "../types";

interface ConditionsListProps {
  conditions: Condition[];
  onAddCondition: () => void;
  onRemoveCondition: (id: string) => void;
  onUpdateCondition: (id: string, updates: Partial<Condition>) => void;
}

export const ConditionsList = ({
  conditions,
  onAddCondition,
  onRemoveCondition,
  onUpdateCondition,
}: ConditionsListProps) => {
  return (
    <div className="space-y-4">
      {conditions.map((condition, index) => (
        <div key={condition.id} className="flex items-center gap-2 p-4 border rounded-lg">
          {index > 0 && (
            <Select
              value={condition.logicOperator}
              onValueChange={(value) => onUpdateCondition(condition.id, { 
                logicOperator: value as 'AND' | 'OR' 
              })}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AND">AND</SelectItem>
                <SelectItem value="OR">OR</SelectItem>
              </SelectContent>
            </Select>
          )}

          <Input
            placeholder="Field"
            value={condition.field}
            onChange={(e) => onUpdateCondition(condition.id, { field: e.target.value })}
            className="flex-1"
          />

          <Select
            value={condition.operator}
            onValueChange={(value) => onUpdateCondition(condition.id, { operator: value })}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="equals">Equals</SelectItem>
              <SelectItem value="not_equals">Not Equals</SelectItem>
              <SelectItem value="contains">Contains</SelectItem>
              <SelectItem value="starts_with">Starts With</SelectItem>
              <SelectItem value="ends_with">Ends With</SelectItem>
              <SelectItem value="greater_than">Greater Than</SelectItem>
              <SelectItem value="less_than">Less Than</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Value"
            value={condition.value}
            onChange={(e) => onUpdateCondition(condition.id, { value: e.target.value })}
            className="flex-1"
          />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemoveCondition(condition.id)}
            className="text-destructive"
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ))}
      <Button onClick={onAddCondition} variant="outline" className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Condition
      </Button>
    </div>
  );
};