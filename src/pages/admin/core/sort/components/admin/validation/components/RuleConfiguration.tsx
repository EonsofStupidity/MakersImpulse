import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ValidationRuleType } from "../../components/types";

export interface RuleConfigurationProps {
  ruleType: ValidationRuleType;
  configuration: Record<string, any>;
  onUpdate: (config: Record<string, any>) => void;
}

export const RuleConfiguration = ({
  ruleType,
  configuration,
  onUpdate,
}: RuleConfigurationProps) => {
  const handleChange = (key: string, value: any) => {
    onUpdate({ ...configuration, [key]: value });
  };

  switch (ruleType) {
    case "min_length":
    case "max_length":
      return (
        <div>
          <Label>Length Value</Label>
          <Input
            type="number"
            value={configuration.value || ""}
            onChange={(e) => handleChange("value", parseInt(e.target.value))}
          />
        </div>
      );

    case "pattern":
      return (
        <div>
          <Label>Regular Expression</Label>
          <Input
            value={configuration.pattern || ""}
            onChange={(e) => handleChange("pattern", e.target.value)}
            placeholder="Enter regex pattern"
          />
        </div>
      );

    case "allowed_chars":
      return (
        <div>
          <Label>Allowed Characters</Label>
          <Input
            value={configuration.chars || ""}
            onChange={(e) => handleChange("chars", e.target.value)}
            placeholder="e.g., a-zA-Z0-9"
          />
        </div>
      );

    default:
      return null;
  }
};