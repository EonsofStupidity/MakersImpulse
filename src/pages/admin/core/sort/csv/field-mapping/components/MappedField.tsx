import { motion } from "framer-motion";
import { GripVertical } from "lucide-react";
import { Draggable } from "react-beautiful-dnd";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CompatibilityBadge } from "./CompatibilityBadge";
import { MappedField } from "../types";

interface MappedFieldProps {
  field: MappedField;
  index: number;
  targetFields: string[];
  isRequired?: boolean;
  onTargetFieldSelect: (sourceField: string, targetField: string) => void;
}

export const MappedFieldComponent = ({
  field,
  index,
  targetFields,
  isRequired,
  onTargetFieldSelect,
}: MappedFieldProps) => {
  return (
    <Draggable draggableId={field.sourceField} index={index}>
      {(provided, snapshot) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.draggableProps}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`p-3 bg-card border rounded-md group ${
            snapshot.isDragging ? "shadow-lg ring-2 ring-primary" : ""
          } ${isRequired && !field.targetField ? "border-destructive" : ""}`}
        >
          <div className="flex items-center gap-2">
            <div {...provided.dragHandleProps} className="text-muted-foreground hover:text-primary transition-colors">
              <GripVertical className="h-4 w-4" />
            </div>
            <span className="flex-shrink-0">{field.sourceField}</span>
            <span className="text-muted-foreground mx-2">→</span>
            <Select
              value={field.targetField}
              onValueChange={(value) => onTargetFieldSelect(field.sourceField, value)}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select target field" />
              </SelectTrigger>
              <SelectContent>
                {targetFields.map((targetField) => (
                  <SelectItem key={targetField} value={targetField}>
                    {targetField}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {field.compatibilityStatus && (
              <CompatibilityBadge status={field.compatibilityStatus} />
            )}
          </div>
        </motion.div>
      )}
    </Draggable>
  );
};