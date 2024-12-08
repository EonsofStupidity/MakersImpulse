import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

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
  const [newField, setNewField] = useState({
    name: "",
    type: "text",
    isPrimary: false
  });

  const addField = () => {
    if (newField.name) {
      const fields = newField.isPrimary ? "primary_fields" : "secondary_fields";
      onUpdate({
        ...config,
        [fields]: [...(config[fields] || []), newField]
      });
      setNewField({
        name: "",
        type: "text",
        isPrimary: false
      });
    }
  };

  const validateAndContinue = () => {
    if (config.primary_fields?.length >= 1) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Field Name</Label>
            <Input
              value={newField.name}
              onChange={(e) => setNewField({ ...newField, name: e.target.value })}
              placeholder="Enter field name"
            />
          </div>
          <div>
            <Label>Field Type</Label>
            <Select
              value={newField.type}
              onValueChange={(value) => setNewField({ ...newField, type: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="boolean">Boolean</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={newField.isPrimary}
            onCheckedChange={(checked) =>
              setNewField({ ...newField, isPrimary: checked })
            }
          />
          <Label>Primary Field</Label>
        </div>

        <Button onClick={addField} className="w-full">
          Add Field
        </Button>
      </div>

      {(!config.primary_fields || config.primary_fields.length === 0) && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            At least one primary field is required
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={validateAndContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};