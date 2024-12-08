import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataPreviewTable } from "./DataPreviewTable";

interface PreviewStepProps {
  config: any;
  onUpdate: (config: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const PreviewStep = ({
  config,
  onUpdate,
  onNext,
  onBack
}: PreviewStepProps) => {
  const [errors, setErrors] = useState<Record<number, string[]>>({});

  const handleDataChange = (rowIndex: number, field: string, value: string) => {
    const newData = [...(config.previewData || [])];
    if (!newData[rowIndex]) {
      newData[rowIndex] = {};
    }
    newData[rowIndex][field] = value;
    onUpdate({ ...config, previewData: newData });
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Preview Data</h3>
        <p className="text-sm text-muted-foreground">
          Review and edit your data before import.
        </p>
      </div>

      <DataPreviewTable
        data={config.previewData || []}
        errors={errors}
        onDataChange={handleDataChange}
      />

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