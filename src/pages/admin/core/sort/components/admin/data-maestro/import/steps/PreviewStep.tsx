import { Button } from "@/components/ui/button";
import { ImportConfig } from "../../types";
import { ImportSession } from "../../types";

interface PreviewStepProps {
  config: ImportConfig;
  onUpdate: (config: ImportConfig) => void;
  session: ImportSession | null;
}

export const PreviewStep = ({
  config,
  onUpdate,
  session
}: PreviewStepProps) => {
  return (
    <div className="space-y-6">
      {/* Preview content will go here */}
      <div className="flex justify-end">
        <Button>
          Complete Import
        </Button>
      </div>
    </div>
  );
};