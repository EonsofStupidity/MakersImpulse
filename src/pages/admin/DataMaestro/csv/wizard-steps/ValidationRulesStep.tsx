import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

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
  const [selectedField, setSelectedField] = useState("");

  const updateValidationRule = (fieldName: string, rule: string, value: any) => {
    const newRules = {
      ...config.validation_rules,
      [fieldName]: {
        ...config.validation_rules[fieldName],
        [rule]: value
      }
    };
    onUpdate({ ...config, validation_rules: newRules });
  };

  return (
    <div className="space-y-6">
      {config.primary_fields.map((field: any) => (
        <div key={field.name} className="space-y-4 p-4 border rounded-lg">
          <h3 className="font-medium">{field.name}</h3>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Required Field</Label>
              <Switch
                checked={config.validation_rules[field.name]?.required}
                onCheckedChange={(checked) => 
                  updateValidationRule(field.name, 'required', checked)
                }
              />
            </div>

            {field.type === 'string' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Min Length</Label>
                  <Input
                    type="number"
                    value={config.validation_rules[field.name]?.minLength || ''}
                    onChange={(e) => 
                      updateValidationRule(field.name, 'minLength', parseInt(e.target.value))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Length</Label>
                  <Input
                    type="number"
                    value={config.validation_rules[field.name]?.maxLength || ''}
                    onChange={(e) => 
                      updateValidationRule(field.name, 'maxLength', parseInt(e.target.value))
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Continue
        </Button>
      </div>
    </div>
  );
};