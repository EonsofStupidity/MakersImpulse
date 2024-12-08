import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface OnboardingNavigationProps {
  currentStep: {
    is_required: boolean;
  };
  currentStepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
}

export const OnboardingNavigation = ({
  currentStep,
  currentStepIndex,
  totalSteps,
  onNext,
  onPrevious,
  onSkip,
}: OnboardingNavigationProps) => {
  return (
    <div className="flex justify-between pt-6">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStepIndex === 0}
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>
      <div className="space-x-2">
        {!currentStep.is_required && (
          <Button variant="ghost" onClick={onSkip}>
            Skip
          </Button>
        )}
        <Button onClick={onNext}>
          {currentStepIndex === totalSteps - 1 ? "Complete" : "Next"}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};