import { Button } from "@/components/ui/button";
import { ImportSession } from "../types";

interface ReviewStepProps {
  config: ImportSession | null;
  onBack: () => void;
  onSave: () => void;
}

export const ReviewStep = ({
  config,
  onBack,
  onSave
}: ReviewStepProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        <Button onClick={onSave}>
          Save Configuration
        </Button>
      </div>
    </div>
  );
};