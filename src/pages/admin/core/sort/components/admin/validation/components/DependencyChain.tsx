import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ValidationRule } from "../../components/types";
import { X } from "lucide-react";

interface DependencyChainProps {
  availableRules: ValidationRule[];
  selectedDependencies: string[];
  onUpdate: (dependencies: string[]) => void;
}

export const DependencyChain = ({ availableRules, selectedDependencies, onUpdate }: DependencyChainProps) => {
  const [error, setError] = useState<string | null>(null);

  const addDependency = (ruleId: string) => {
    if (selectedDependencies.includes(ruleId)) {
      setError("This rule is already in the dependency chain");
      return;
    }
    setError(null);
    onUpdate([...selectedDependencies, ruleId]);
  };

  const removeDependency = (ruleId: string) => {
    onUpdate(selectedDependencies.filter(id => id !== ruleId));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Select onValueChange={addDependency}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Add dependency" />
          </SelectTrigger>
          <SelectContent>
            {availableRules.map((rule) => (
              <SelectItem key={rule.id} value={rule.id || ""}>
                {rule.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="space-y-2">
        {selectedDependencies.map((depId) => {
          const rule = availableRules.find(r => r.id === depId);
          return (
            <div key={depId} className="flex items-center justify-between p-2 border rounded-md">
              <span>{rule?.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeDependency(depId)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};