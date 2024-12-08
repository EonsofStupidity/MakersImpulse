import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { StepContent } from "./StepContent";
import { StepNavigation } from "./StepNavigation";
import { WizardProgress } from "./WizardProgress";
import { useImportSession } from "../../hooks/useImportSession";
import { ImportConfig } from "../../types";

const initialConfig: ImportConfig = {
  tableName: "",
  relationships: [],
  tags: [],
  validationRules: {},
  primaryFields: [],
  secondaryFields: [],
  nullThreshold: 0.3,
  format: 'csv',
  formatSettings: {}
};

export const ImportWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [config, setConfig] = useState<ImportConfig>(initialConfig);
  const { session, updateSession } = useImportSession();
  const { toast } = useToast();

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      await updateSession({
        ...session,
        status: 'processing',
        column_mappings: config.validationRules
      });
      
      toast({
        title: "Success",
        description: "Import configuration saved successfully"
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
        <WizardProgress currentStep={currentStep} />
        
        <StepContent
          currentStep={currentStep}
          config={config}
          setConfig={setConfig}
          session={session}
          onNext={handleNext}
          onBack={handleBack}
        />

        <StepNavigation
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          onSubmit={handleSubmit}
          isValid={true} // Will be handled by validation context
        />
      </div>
    </Card>
  );
};