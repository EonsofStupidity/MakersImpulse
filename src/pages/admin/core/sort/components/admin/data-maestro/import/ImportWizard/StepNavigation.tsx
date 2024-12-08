import { Button } from "@/components/ui/button";

interface StepNavigationProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  onSubmit: () => void;
  isValid: boolean;
}

export const StepNavigation = ({
  currentStep,
  setCurrentStep,
  onSubmit,
  isValid
}: StepNavigationProps) => {
  const isLastStep = currentStep === 3;

  return (
    <div className="flex justify-between">
      {currentStep > 0 && (
        <Button
          variant="outline"
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Back
        </Button>
      )}
      
      <Button
        className="ml-auto"
        onClick={isLastStep ? onSubmit : () => setCurrentStep(currentStep + 1)}
        disabled={!isValid}
      >
        {isLastStep ? "Complete" : "Continue"}
      </Button>
    </div>
  );
};