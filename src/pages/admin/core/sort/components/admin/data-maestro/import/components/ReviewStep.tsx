import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ReviewStepProps {
  config: any;
  onBack: () => void;
  onSave: () => void;
}

export const ReviewStep = ({
  config,
  onBack,
  onSave
}: ReviewStepProps) => {
  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Review Configuration</h3>
        <p className="text-sm text-muted-foreground">
          Review your import configuration before proceeding.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium">Primary Fields</h4>
          <p className="text-sm text-muted-foreground">
            {config.primary_fields?.join(", ") || "None"}
          </p>
        </div>

        <div>
          <h4 className="font-medium">Secondary Fields</h4>
          <p className="text-sm text-muted-foreground">
            {config.secondary_fields?.join(", ") || "None"}
          </p>
        </div>

        <div>
          <h4 className="font-medium">Validation Rules</h4>
          <p className="text-sm text-muted-foreground">
            {Object.keys(config.validation_rules || {}).length} rules configured
          </p>
        </div>
      </div>

      <Alert>
        <AlertTitle>Ready to Import</AlertTitle>
        <AlertDescription>
          Please review your configuration carefully before proceeding.
        </AlertDescription>
      </Alert>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onSave}>
          Start Import
        </Button>
      </div>
    </Card>
  );
};