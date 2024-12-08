import { Button } from "@/components/ui/button";
import { ImportSession } from "../types";

interface FieldMappingStepProps {
  config: ImportSession | null;
  onUpdate: (config: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const FieldMappingStep = ({
  config,
  onUpdate,
  onNext,
  onBack
}: FieldMappingStepProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        <Button onClick={onNext}>
          Continue
        </Button>
      </div>
    </div>
  );
};