import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImportConfig } from "../../types";

interface TableDefinitionStepProps {
  config: ImportConfig;
  onUpdate: (config: ImportConfig) => void;
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

  const isValid = config.tableName;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="tableName">Table Name</Label>
        <Input
          id="tableName"
          value={config.tableName}
          onChange={(e) => handleChange("tableName", e.target.value)}
          placeholder="Enter the target table name"
        />
      </div>

      <Button onClick={onNext} disabled={!isValid} className="w-full">
        Continue
      </Button>
    </div>
  );
};