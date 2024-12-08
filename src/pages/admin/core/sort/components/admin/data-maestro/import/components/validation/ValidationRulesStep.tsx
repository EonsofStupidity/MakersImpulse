import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ValidationRuleField } from "./ValidationRuleField";

interface ValidationRulesStepProps {
  config: any;
  onUpdate: (config: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ValidationRulesStep = ({
  config,
  onUpdate,
  onNext,
  onBack
}: ValidationRulesStepProps) => {
  const updateValidationRule = (field: string, key: string, value: any) => {
    const newRules = {
      ...config.validation_rules,
      [field]: {
        ...config.validation_rules?.[field],
        [key]: value
      }
    };
    onUpdate({ ...config, validation_rules: newRules });
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Validation Rules</h3>
        <p className="text-sm text-muted-foreground">
          Configure validation rules for your fields.
        </p>
      </div>

      {config.primary_fields?.map((field: string) => (
        <ValidationRuleField
          key={field}
          field={field}
          rules={config.validation_rules?.[field] || {}}
          onUpdateRule={updateValidationRule}
        />
      ))}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Continue
        </Button>
      </div>
    </Card>
  );
};