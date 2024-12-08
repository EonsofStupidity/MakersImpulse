import { Droppable, Draggable } from "react-beautiful-dnd";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GripVertical } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { MappedField } from "../types";
import { motion } from "framer-motion";

interface MappedFieldsListProps {
  fields: MappedField[];
  targetFields: string[];
  requiredFields?: string[];
  onTargetFieldSelect: (sourceField: string, targetField: string) => void;
}

export const MappedFieldsList = ({
  fields,
  targetFields,
  requiredFields = [],
  onTargetFieldSelect,
}: MappedFieldsListProps) => {
  const getCompatibilityColor = (status?: string) => {
    switch (status) {
      case 'compatible': return 'bg-green-500/10 text-green-500';
      case 'needs_conversion': return 'bg-yellow-500/10 text-yellow-500';
      case 'incompatible': return 'bg-red-500/10 text-red-500';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="p-4 bg-background">
      <h3 className="font-medium mb-4 text-lg">Mapped Fields</h3>
      <Droppable droppableId="mapped">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`space-y-2 min-h-[200px] rounded-lg transition-colors ${
              snapshot.isDraggingOver ? "bg-muted/50 ring-2 ring-primary/20" : ""
            }`}
          >
            {fields.map((field, index) => (
              <Draggable key={field.sourceField} draggableId={field.sourceField} index={index}>
                {(provided, snapshot) => (
                  <motion.div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={cn(
                      "p-3 bg-card border rounded-md group",
                      snapshot.isDragging ? "shadow-lg ring-2 ring-primary" : "",
                      requiredFields.includes(field.sourceField) && !field.targetField && "border-destructive"
                    )}
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
                        <Badge className={cn("ml-2", getCompatibilityColor(field.compatibilityStatus))}>
                          {field.compatibilityStatus}
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Card>
  );
};