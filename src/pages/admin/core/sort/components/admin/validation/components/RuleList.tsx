import { ValidationRule } from "../../components/types";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface RuleListProps {
  rules: ValidationRule[];
  onUpdateRule: (rule: ValidationRule) => void;
  onDeleteRule: (ruleId: string) => void;
}

export const RuleList = ({ rules, onUpdateRule, onDeleteRule }: RuleListProps) => {
  return (
    <div className="space-y-4">
      {rules.map((rule) => (
        <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h3 className="font-medium">{rule.name}</h3>
            <p className="text-sm text-muted-foreground">{rule.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDeleteRule(rule.id!)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};