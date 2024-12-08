import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { DragDropFieldMapping } from "@/components/admin/data-maestro/import/components/csv/field-mapping/DragDropFieldMapping";

interface FieldMappingStepProps {
  sourceFields: string[];
  targetFields: string[];
  initialMappings?: Record<string, string>;
  onComplete: (mappings: Record<string, string>) => void;
  onBack?: () => void;
}

export const FieldMappingStep = ({
  sourceFields,
  targetFields,
  initialMappings = {},
  onComplete,
  onBack
}: FieldMappingStepProps) => {
  const [mappings, setMappings] = useState<Record<string, string>>(initialMappings);
  const [error, setError] = useState<string>("");

  const handleUpdateMapping = (newMappings: Record<string, string>) => {
    setMappings(newMappings);
    setError("");
  };

  const handleNext = () => {
    const unmappedRequired = sourceFields.filter(
      field => !mappings[field]
    );

    if (unmappedRequired.length > 0) {
      setError(`Required fields not mapped: ${unmappedRequired.join(", ")}`);
      return;
    }

    onComplete(mappings);
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Map Fields</h3>
        <p className="text-sm text-muted-foreground">
          Drag fields from the available list to map them to your target fields.
        </p>
      </div>

      <DragDropFieldMapping
        sourceFields={sourceFields}
        targetFields={targetFields}
        mappings={mappings}
        onUpdateMapping={handleUpdateMapping}
      />

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
        )}
        <Button onClick={handleNext}>
          Continue
        </Button>
      </div>
    </Card>
  );
};
