import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

interface ValidationRulesFormProps {
  rules: Record<string, any>;
  onChange: (rules: Record<string, any>) => void;
}

export const ValidationRulesForm = ({ rules, onChange }: ValidationRulesFormProps) => {
  const updateRule = (field: string, key: string, value: any) => {
    const updatedRules = {
      ...rules,
      [field]: {
        ...rules[field],
        [key]: value
      }
    };
    onChange(updatedRules);
  };

  return (
    <Card className="p-4">
      <div className="space-y-6">
        {Object.keys(rules).map((field) => (
          <div key={field} className="space-y-4">
            <h3 className="font-medium">{field}</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={`${field}-required`}>Required</Label>
                <Switch
                  id={`${field}-required`}
                  checked={rules[field]?.required}
                  onCheckedChange={(checked) => updateRule(field, 'required', checked)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Min Length</Label>
                  <Input
                    type="number"
                    value={rules[field]?.minLength || ''}
                    onChange={(e) => updateRule(field, 'minLength', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Max Length</Label>
                  <Input
                    type="number"
                    value={rules[field]?.maxLength || ''}
                    onChange={(e) => updateRule(field, 'maxLength', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};