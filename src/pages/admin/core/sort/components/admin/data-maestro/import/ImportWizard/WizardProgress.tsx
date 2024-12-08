import { Progress } from "@/components/ui/progress";

interface WizardProgressProps {
  currentStep: number;
}

const STEPS = [
  "Table Definition",
  "Field Mapping", 
  "Validation Rules",
  "Preview"
];

export const WizardProgress = ({ currentStep }: WizardProgressProps) => {
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="space-y-2">
      <Progress value={progress} className="h-2" />
      <div className="flex justify-between text-sm text-muted-foreground">
        {STEPS.map((step, index) => (
          <span
            key={index}
            className={currentStep >= index ? "text-primary" : ""}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
};