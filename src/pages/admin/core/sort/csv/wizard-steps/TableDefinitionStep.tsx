import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { ImportSession } from "../types";

interface TableDefinitionStepProps {
  config: ImportSession | null;
  onUpdate: (config: Partial<ImportSession>) => void;
  onNext: () => void;
}

export const TableDefinitionStep = ({
  config,
  onUpdate,
  onNext
}: TableDefinitionStepProps) => {
  const handleChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
  };

  const isValid = Boolean(config?.file_name && config?.target_table);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">File Name</Label>
        <Input
          id="name"
          value={config?.file_name || ""}
          onChange={(e) => handleChange("file_name", e.target.value)}
          placeholder="Enter the file name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tableName">Target Table</Label>
        <Input
          id="tableName"
          value={config?.target_table || ""}
          onChange={(e) => handleChange("target_table", e.target.value)}
          placeholder="Enter the target table name"
        />
        {!config?.target_table && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Table name is required</AlertDescription>
          </Alert>
        )}
      </div>

      <Button onClick={onNext} disabled={!isValid} className="w-full">
        Continue
      </Button>
    </div>
  );
};