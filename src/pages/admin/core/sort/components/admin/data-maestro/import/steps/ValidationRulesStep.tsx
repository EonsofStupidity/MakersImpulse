import { Button } from "@/components/ui/button";
import { ImportConfig } from "../../types";

interface ValidationRulesStepProps {
  config: ImportConfig;
  onUpdate: (config: ImportConfig) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ValidationRulesStep = ({
  config,
  onUpdate,
  onNext,
  onBack
}: ValidationRulesStepProps) => {
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