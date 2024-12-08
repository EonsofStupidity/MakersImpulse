import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface TableDefinitionStepProps {
  config: any;
  onUpdate: (config: any) => void;
  onNext: () => void;
}

export const TableDefinitionStep = ({
  config,
  onUpdate,
  onNext
}: TableDefinitionStepProps) => {
  const handleChange = (field: string, value: string) => {
    onUpdate({ ...config, [field]: value });
  };

  const isValid = config.name && config.table_name;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Configuration Name</Label>
        <Input
          id="name"
          value={config.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Enter a name for this import configuration"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tableName">Table Name</Label>
        <Input
          id="tableName"
          value={config.table_name}
          onChange={(e) => handleChange("table_name", e.target.value)}
          placeholder="Enter the target table name"
        />
        {!config.table_name && (
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