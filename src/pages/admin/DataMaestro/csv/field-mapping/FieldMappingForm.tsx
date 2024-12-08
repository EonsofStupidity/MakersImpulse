import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { FieldMappingAutocomplete } from "./FieldMappingAutocomplete";

interface FieldMappingFormProps {
  tableName: string;
  primaryFields: string[];
  secondaryFields: string[];
  onFieldsChange: (primary: string[], secondary: string[]) => void;
  nullThreshold: number;
}

export const FieldMappingForm = ({
  tableName,
  primaryFields,
  secondaryFields,
  onFieldsChange,
  nullThreshold
}: FieldMappingFormProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [newField, setNewField] = useState({ name: "", isPrimary: true });

  useEffect(() => {
    const fetchSuggestions = async () => {
      const { data } = await supabase
        .from('field_mapping_history')
        .select('*')
        .order('frequency', { ascending: false })
        .limit(10);

      if (data) {
        setSuggestions(data.map(d => d.target_field));
      }
    };

    fetchSuggestions();
  }, []);

  const addField = () => {
    if (newField.name) {
      if (newField.isPrimary) {
        onFieldsChange([...primaryFields, newField.name], secondaryFields);
      } else {
        onFieldsChange(primaryFields, [...secondaryFields, newField.name]);
      }
      setNewField({ name: "", isPrimary: true });
    }
  };

  const showNullWarning = primaryFields.length + secondaryFields.length > 0 &&
    (secondaryFields.length / (primaryFields.length + secondaryFields.length)) > nullThreshold;

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label>Add New Field</Label>
          <div className="flex gap-2">
            <FieldMappingAutocomplete
              sourceFields={[]}
              targetFields={suggestions}
              value={newField.name}
              onSelect={(value) => setNewField({ ...newField, name: value })}
              placeholder="Enter field name"
            />
            <div className="flex items-center gap-2">
              <Switch
                checked={newField.isPrimary}
                onCheckedChange={(checked) => setNewField({ ...newField, isPrimary: checked })}
              />
              <Label>Primary Field</Label>
            </div>
            <Button type="button" onClick={addField}>Add Field</Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="mb-2 block">Primary Fields</Label>
            {primaryFields.map((field, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <Input value={field} disabled />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newFields = [...primaryFields];
                    newFields.splice(index, 1);
                    onFieldsChange(newFields, secondaryFields);
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>

          <div>
            <Label className="mb-2 block">Secondary Fields</Label>
            {secondaryFields.map((field, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <Input value={field} disabled />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newFields = [...secondaryFields];
                    newFields.splice(index, 1);
                    onFieldsChange(primaryFields, newFields);
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>

        {primaryFields.length < 3 && (
          <Alert>
            <AlertDescription>
              At least 3 primary fields are required. Currently have {primaryFields.length}.
            </AlertDescription>
          </Alert>
        )}

        {showNullWarning && (
          <Alert>
            <AlertDescription>
              A large number of fields are marked as secondary (nullable). This might affect data quality.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};