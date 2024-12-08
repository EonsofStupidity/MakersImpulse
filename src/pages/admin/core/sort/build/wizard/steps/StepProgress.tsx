import { Progress } from "@/components/ui/progress";

const STEPS = [
  { id: "kinematics", label: "Kinematics" },
  { id: "details", label: "Printer Details" },
  { id: "core", label: "Core Components" },
  { id: "addons", label: "Add-ons" },
  { id: "review", label: "Review" },
];

interface StepProgressProps {
  currentStep: number;
}

export const StepProgress = ({ currentStep }: StepProgressProps) => {
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="space-y-2">
      <Progress value={progress} className="h-2" />
      <div className="flex justify-between text-sm text-muted-foreground">
        {STEPS.map((step, index) => (
          <span
            key={step.id}
            className={index <= currentStep ? "text-primary" : ""}
          >
            {step.label}
          </span>
        ))}
      </div>
    </div>
  );
};