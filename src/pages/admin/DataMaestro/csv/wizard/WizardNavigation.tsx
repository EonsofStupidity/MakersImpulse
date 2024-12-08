import { Button } from "@/components/ui/button";
import { WIZARD_STEPS } from "./WizardSteps";
import { ImportConfig } from "../types";

interface WizardNavigationProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  config: ImportConfig;
  onSubmit: () => void;
  disabled?: boolean;
}

export const WizardNavigation = ({
  currentStep,
  setCurrentStep,
  config,
  onSubmit,
  disabled
}: WizardNavigationProps) => {
  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return config.tableName.length > 0;
      case 2:
        return config.primaryFields.length >= 3;
      case 3:
        return true;
      case 4:
        return Object.keys(config.validationRules).length > 0;
      default:
        return true;
    }
  };

  return (
    <div className="flex justify-between">
      {currentStep > 0 && (
        <Button
          variant="outline"
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={currentStep === 0 || disabled}
        >
          Back
        </Button>
      )}
      {currentStep === WIZARD_STEPS.length - 1 ? (
        <Button onClick={onSubmit} disabled={disabled}>
          Complete Configuration
        </Button>
      ) : (
        <Button 
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={!validateStep() || disabled}
        >
          Continue
        </Button>
      )}
    </div>
  );
};