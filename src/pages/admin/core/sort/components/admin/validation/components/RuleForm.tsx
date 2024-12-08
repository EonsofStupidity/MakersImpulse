import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ValidationRule, ValidationRuleType } from "../../components/types";

export interface RuleFormProps {
  rule: ValidationRule;
  onUpdate: (updates: Partial<ValidationRule>) => void;
}

export const RuleForm = ({
  rule,
  onUpdate,
}: RuleFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Rule Name</Label>
        <Input
          value={rule.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="Enter rule name"
        />
      </div>
      <div>
        <Label>Rule Type</Label>
        <Select value={rule.rule_type} onValueChange={(value) => onUpdate({ rule_type: value as ValidationRuleType })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="required">Required</SelectItem>
            <SelectItem value="min_length">Minimum Length</SelectItem>
            <SelectItem value="max_length">Maximum Length</SelectItem>
            <SelectItem value="pattern">Pattern Match</SelectItem>
            <SelectItem value="allowed_chars">Allowed Characters</SelectItem>
            <SelectItem value="data_type">Data Type</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};