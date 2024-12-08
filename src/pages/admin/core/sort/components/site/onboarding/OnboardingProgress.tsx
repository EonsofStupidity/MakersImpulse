import { Progress } from "@/components/ui/progress";

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
}

export const OnboardingProgress = ({
  currentStep,
  totalSteps,
  progress,
}: OnboardingProgressProps) => {
  return (
    <div className="space-y-2">
      <Progress value={progress} className="w-full h-2" />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
    </div>
  );
};