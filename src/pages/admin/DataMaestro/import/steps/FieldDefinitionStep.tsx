import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, Plus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface FieldDefinitionStepProps {
  config: any;
  onUpdate: (config: any) => void;
  onNext: () => void;
}

const DATA_TYPES = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
  { value: "boolean", label: "Boolean" }
];

export const FieldDefinitionStep = ({ config, onUpdate, onNext }: FieldDefinitionStepProps) => {
  const [newField, setNewField] = useState({
    name: "",
    type: "text",
    isPrimary: false,
    isRequired: false,
    validationRules: {}
  });

  const addField = () => {
    if (newField.name) {
      const fields = newField.isPrimary ? "primaryFields" : "secondaryFields";
      onUpdate({
        ...config,
        [fields]: [...config[fields], newField]
      });
      setNewField({
        name: "",
        type: "text",
        isPrimary: false,
        isRequired: false,
        validationRules: {}
      });
    }
  };

  const validateConfiguration = () => {
    if (config.primaryFields.length < config.minPrimaryFields) {
      return false;
    }
    return true;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="tableName">Table Name</Label>
          <Input
            id="tableName"
            value={config.tableName}
            onChange={(e) => onUpdate({ ...config, tableName: e.target.value })}
            placeholder="Enter table name"
          />
        </div>

        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">Add New Field</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fieldName">Field Name</Label>
                <Input
                  id="fieldName"
                  value={newField.name}
                  onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                  placeholder="Enter field name"
                />
              </div>
              <div>
                <Label htmlFor="fieldType">Field Type</Label>
                <Select
                  value={newField.type}
                  onValueChange={(value) => setNewField({ ...newField, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {DATA_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={newField.isPrimary}
                  onCheckedChange={(checked) =>
                    setNewField({ ...newField, isPrimary: checked })
                  }
                />
                <Label>Primary Field</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={newField.isRequired}
                  onCheckedChange={(checked) =>
                    setNewField({ ...newField, isRequired: checked })
                  }
                />
                <Label>Required</Label>
              </div>
            </div>

            <Button onClick={addField} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Field
            </Button>
          </div>
        </Card>

        {config.primaryFields.length < config.minPrimaryFields && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Insufficient Primary Fields</AlertTitle>
            <AlertDescription>
              You need at least {config.minPrimaryFields} primary fields.
              Currently have {config.primaryFields.length}.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Primary Fields</h3>
          <div className="space-y-2">
            {config.primaryFields.map((field: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded">
                <span>{field.name}</span>
                <span className="text-muted-foreground">{field.type}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Secondary Fields</h3>
          <div className="space-y-2">
            {config.secondaryFields.map((field: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded">
                <span>{field.name}</span>
                <span className="text-muted-foreground">{field.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button
        onClick={onNext}
        disabled={!validateConfiguration()}
        className="w-full"
      >
        Continue to Relationships
      </Button>
    </div>
  );
};