import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { MappedField } from "./types";

interface MappedFieldsProps {
  fields: MappedField[];
  targetFields: string[];
  onTargetFieldSelect: (index: number, targetField: string) => void;
  onRemove: (index: number) => void;
}

export const MappedFields = ({ 
  fields, 
  targetFields, 
  onTargetFieldSelect, 
  onRemove 
}: MappedFieldsProps) => {
  return (
    <div className="space-y-2">
      {fields.map((field, index) => (
        <div key={field.source} className="flex items-center gap-2 p-2 border rounded">
          <span>{field.source}</span>
          <span className="text-muted-foreground mx-2">→</span>
          <select
            value={field.target}
            onChange={(e) => onTargetFieldSelect(index, e.target.value)}
            className="flex-1 bg-background border rounded px-2 py-1"
          >
            <option value="">Select target field</option>
            {targetFields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(index)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};