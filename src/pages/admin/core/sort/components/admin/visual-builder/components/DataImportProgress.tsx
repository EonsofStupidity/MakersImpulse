interface DataImportProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const DataImportProgress = ({ currentStep, totalSteps }: DataImportProgressProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>Step {currentStep} of {totalSteps}</span>
      <span>({Math.round(progress)}% complete)</span>
    </div>
  );
};