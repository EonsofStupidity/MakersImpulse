import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomFunctionEditor } from "@/components/admin/validation/components/CustomFunctionEditor";
import { ValidationGroupList } from "@/components/admin/validation/groups/ValidationGroupList";

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

  const updateCustomFunction = (fieldName: string, functionBody: string) => {
    const newRules = {
      ...config.validation_rules,
      [fieldName]: {
        ...config.validation_rules[fieldName],
        customFunction: functionBody
      }
    };
    onUpdate({ ...config, validation_rules: newRules });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="fields">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="fields">Field Rules</TabsTrigger>
          <TabsTrigger value="groups">Rule Groups</TabsTrigger>
        </TabsList>

        <TabsContent value="fields" className="space-y-6">
          {config.primary_fields.map((field: any) => (
            <div key={field.name} className="space-y-4 p-4 border rounded-lg">
              <h3 className="font-medium">{field.name}</h3>
              
              <Tabs defaultValue="basic">
                <TabsList>
                  <TabsTrigger value="basic">Basic Rules</TabsTrigger>
                  <TabsTrigger value="custom">Custom Function</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
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
                </TabsContent>

                <TabsContent value="custom">
                  <CustomFunctionEditor
                    initialFunction={config.validation_rules[field.name]?.customFunction || ""}
                    onSave={(functionBody) => updateCustomFunction(field.name, functionBody)}
                  />
                </TabsContent>
              </Tabs>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="groups">
          <ValidationGroupList />
        </TabsContent>
      </Tabs>

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