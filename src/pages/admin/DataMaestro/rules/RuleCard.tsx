import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { ValidationRule, ValidationRuleType } from "../types";

interface RuleCardProps {
  rule: ValidationRule;
  onUpdate: (updates: Partial<ValidationRule>) => void;
  onDelete: () => void;
}

export const RuleCard = ({ rule, onUpdate, onDelete }: RuleCardProps) => {
  const getRuleTypeDisplay = (type: ValidationRuleType) => {
    const displays = {
      required: "Required",
      min_length: "Minimum Length",
      max_length: "Maximum Length",
      pattern: "Pattern Match",
      allowed_chars: "Allowed Characters",
      data_type: "Data Type"
    };
    return displays[type] || type;
  };

  const getConfigurationSummary = (rule: ValidationRule) => {
    if (!rule.configuration) return null;

    switch (rule.rule_type) {
      case "min_length":
        return `Min length: ${rule.configuration.value}`;
      case "max_length":
        return `Max length: ${rule.configuration.value}`;
      case "pattern":
        return `Pattern: ${rule.configuration.pattern}`;
      case "allowed_chars":
        return `Allowed: ${rule.configuration.chars}`;
      case "data_type":
        return `Type: ${rule.configuration.type}`;
      default:
        return null;
    }
  };

  return (
    <Card className="p-4 w-full">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">{rule.name}</h3>
            {rule.description && (
              <p className="text-sm text-muted-foreground">{rule.description}</p>
            )}
          </div>
          <Badge variant={rule.is_active ? "default" : "secondary"}>
            {getRuleTypeDisplay(rule.rule_type)}
          </Badge>
        </div>

        {rule.configuration && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4" />
            <span>{getConfigurationSummary(rule)}</span>
          </div>
        )}
      </div>
    </Card>
  );
};