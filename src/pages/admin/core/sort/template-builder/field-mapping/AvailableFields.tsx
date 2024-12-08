import { Droppable, Draggable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvailableFieldsProps {
  fields: string[];
}

export const AvailableFields = ({ fields }: AvailableFieldsProps) => {
  return (
    <Droppable droppableId="available">
      {(provided) => (
        <div 
          {...provided.droppableProps} 
          ref={provided.innerRef} 
          className="space-y-2"
        >
          {fields.map((field, index) => (
            <Draggable key={field} draggableId={field} index={index}>
              {(provided, snapshot) => (
                <motion.div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "p-2 bg-background border rounded-md flex items-center gap-2",
                    snapshot.isDragging && "shadow-lg"
                  )}
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                  <span>{field}</span>
                </motion.div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};