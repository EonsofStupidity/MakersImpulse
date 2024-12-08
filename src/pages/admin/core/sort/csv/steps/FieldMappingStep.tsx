import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { FieldMappingTable } from "../field-mapping/FieldMappingTable";

interface FieldMappingStepProps {
  config: {
    name: string;
    table_name: string;
    primary_fields: any[];
    secondary_fields: any[];
    validation_rules: Record<string, any>;
    delimiter: string;
    encoding: string;
    min_primary_fields: number;
    null_threshold: number;
    auto_generate_tags: boolean;
    allow_duplicates: boolean;
    column_mappings: Record<string, string>;
    status: "pending";
  };
  onUpdate: (config: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const FieldMappingStep = ({
  config,
  onUpdate,
  onNext,
  onBack,
}: FieldMappingStepProps) => {
  const [error, setError] = useState<string>("");
  const sourceFields = [...config.primary_fields, ...config.secondary_fields].map(f => f.name);
  const targetFields = Object.keys(config.column_mappings);

  const handleUpdateMapping = (sourceField: string, targetField: string) => {
    const newMappings = {
      ...config.column_mappings,
      [sourceField]: targetField
    };
    onUpdate({ ...config, column_mappings: newMappings });
    setError("");
  };

  const handleNext = () => {
    const unmappedRequired = config.primary_fields
      .map(f => f.name)
      .filter(field => !config.column_mappings[field]);

    if (unmappedRequired.length > 0) {
      setError(`Required fields not mapped: ${unmappedRequired.join(", ")}`);
      return;
    }

    onNext();
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Map CSV Columns to Database Fields</h3>
        <p className="text-sm text-muted-foreground">
          Match your CSV columns to the corresponding database fields. Required fields are marked with an asterisk (*).
        </p>
      </div>

      <FieldMappingTable
        sourceFields={sourceFields}
        targetFields={targetFields}
        mappings={config.column_mappings}
        onUpdateMapping={handleUpdateMapping}
      />

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Validation Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext}>
          Continue
        </Button>
      </div>
    </Card>
  );
};