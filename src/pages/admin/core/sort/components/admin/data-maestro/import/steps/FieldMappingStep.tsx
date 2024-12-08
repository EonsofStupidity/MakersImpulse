import { Button } from "@/components/ui/button";
import { ImportConfig } from "../../types";

interface FieldMappingStepProps {
  config: ImportConfig;
  onUpdate: (config: ImportConfig) => void;
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
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Continue
        </Button>
      </div>
    </div>
  );
};