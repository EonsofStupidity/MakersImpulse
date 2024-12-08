import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { WIZARD_STEPS, WizardSteps } from "./wizard/WizardSteps";
import { useImportSession } from "./hooks/useImportSession";

export const ImportWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { session, updateSession } = useImportSession();
  const { toast } = useToast();

  const handleNext = () => {
    if (currentStep < WIZARD_STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Import Configuration</h2>
          <Progress value={(currentStep / WIZARD_STEPS.length) * 100} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            {WIZARD_STEPS.map((step) => (
              <span
                key={step.id}
                className={currentStep >= step.id ? "text-primary" : ""}
              >
                {step.name}
              </span>
            ))}
          </div>
        </div>

        <WizardSteps
          currentStep={currentStep}
          config={session}
          onUpdateConfig={updateSession}
          onNext={handleNext}
          onBack={handleBack}
        />
      </div>
    </Card>
  );
};

export default ImportWizard;