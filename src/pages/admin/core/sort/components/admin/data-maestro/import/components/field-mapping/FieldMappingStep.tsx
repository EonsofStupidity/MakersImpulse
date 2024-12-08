import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FieldMappingForm } from "./FieldMappingForm";

interface FieldMappingStepProps {
  config: any;
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
  const [error, setError] = useState<string>("");

  const handleFieldsChange = (primary: string[], secondary: string[]) => {
    onUpdate({
      ...config,
      primary_fields: primary,
      secondary_fields: secondary
    });
    setError("");
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Map Fields</h3>
        <p className="text-sm text-muted-foreground">
          Define your primary and secondary fields for the import.
        </p>
      </div>

      <FieldMappingForm
        tableName={config.tableName}
        primaryFields={config.primary_fields || []}
        secondaryFields={config.secondary_fields || []}
        onFieldsChange={handleFieldsChange}
        nullThreshold={config.nullThreshold || 0.3}
      />

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Continue
        </Button>
      </div>
    </Card>
  );
};