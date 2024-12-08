import { Card } from "@/components/ui/card";
import { BuildConfig } from "@/types/build";
import { StepContent } from "./steps/StepContent";
import { StepHeader } from "./steps/StepHeader";
import { StepProgress } from "./steps/StepProgress";

interface BuildWizardStepsProps {
  currentStep: number;
  buildConfig: BuildConfig;
  onComponentSelect: (type: "frame" | "motion" | "electronics" | "extras", component: any) => void;
  getCompatibilityArray: () => string[];
  onUpdate: (data: Partial<BuildConfig>) => void;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export const BuildWizardSteps = ({ 
  currentStep, 
  buildConfig, 
  onComponentSelect, 
  getCompatibilityArray,
  onUpdate,
  onNext,
  onBack,
  onSubmit,
  isSubmitting
}: BuildWizardStepsProps) => {
  return (
    <div className="space-y-6">
      <StepHeader />
      <StepProgress currentStep={currentStep} />
      
      <Card className="p-6">
        <StepContent
          currentStep={currentStep}
          buildConfig={buildConfig}
          onComponentSelect={onComponentSelect}
          getCompatibilityArray={getCompatibilityArray}
          onUpdate={onUpdate}
          onNext={onNext}
          onBack={onBack}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </Card>
    </div>
  );
};