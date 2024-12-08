import { Progress } from "@/components/ui/progress";

interface DataImportHeaderProps {
  currentStep: number;
  progress: number;
}

const STEPS = ["Upload", "Preview & Edit", "Relationships", "Tags", "Confirm"] as const;

export const DataImportHeader = ({ currentStep, progress }: DataImportHeaderProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Visual Data Import</h2>
      <Progress value={progress} className="h-2" />
      <div className="flex justify-between mt-2">
        {STEPS.map((step, index) => (
          <span
            key={step}
            className={`text-sm ${
              currentStep >= index + 1 ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
};