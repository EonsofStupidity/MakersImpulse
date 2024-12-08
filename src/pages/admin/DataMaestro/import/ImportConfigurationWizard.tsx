import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { TableDefinitionStep } from "./steps/TableDefinitionStep";
import { FieldMappingStep } from "./steps/FieldMappingStep";
import { ValidationRulesStep } from "./steps/ValidationRulesStep";
import { PreviewStep } from "./steps/PreviewStep";
import { ReviewStep } from "./steps/ReviewStep";
import { Json } from "@/types/builder";

const STEPS = [
  { id: 1, name: "Table Definition" },
  { id: 2, name: "Field Mapping" },
  { id: 3, name: "Validation Rules" },
  { id: 4, name: "Preview" },
  { id: 5, name: "Review" }
];

export const ImportConfigurationWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState({
    name: "",
    table_name: "",
    primary_fields: [],
    secondary_fields: [],
    validation_rules: {},
    delimiter: ",",
    encoding: "UTF-8",
    min_primary_fields: 3,
    null_threshold: 0.3,
    auto_generate_tags: true,
    allow_duplicates: false
  });
  const { toast } = useToast();

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from("import_configurations")
        .insert({
          ...config,
          created_by: user?.id
        });

      if (error) throw error;

      toast({
        title: "Configuration Saved",
        description: "Import configuration has been saved successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save configuration",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Import Configuration</h2>
          <Progress value={(currentStep / STEPS.length) * 100} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            {STEPS.map((step) => (
              <span
                key={step.id}
                className={currentStep >= step.id ? "text-primary" : ""}
              >
                {step.name}
              </span>
            ))}
          </div>
        </div>

        <div className="min-h-[400px]">
          {currentStep === 1 && (
            <TableDefinitionStep
              config={config}
              onUpdate={setConfig}
              onNext={handleNext}
            />
          )}
          {currentStep === 2 && (
            <FieldMappingStep
              config={config}
              onUpdate={setConfig}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && (
            <ValidationRulesStep
              config={config}
              onUpdate={setConfig}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 4 && (
            <PreviewStep
              config={config}
              onUpdate={setConfig}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 5 && (
            <ReviewStep
              config={config}
              onBack={handleBack}
              onSave={handleSave}
            />
          )}
        </div>

        <div className="flex justify-between">
          {currentStep > 1 && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          {currentStep < STEPS.length && (
            <Button onClick={handleNext} className="ml-auto">
              Next
            </Button>
          )}
          {currentStep === STEPS.length && (
            <Button onClick={handleSave} className="ml-auto">
              Save Configuration
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};