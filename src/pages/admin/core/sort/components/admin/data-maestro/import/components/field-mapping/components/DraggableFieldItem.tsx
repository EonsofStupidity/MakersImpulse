import { Draggable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import { GripVertical } from "lucide-react";

interface DraggableFieldItemProps {
  field: string;
  index: number;
  isDragging: boolean;
}

export const DraggableFieldItem = ({ field, index, isDragging }: DraggableFieldItemProps) => {
  return (
    <Draggable draggableId={field} index={index}>
      {(provided, snapshot) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.draggableProps}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`p-3 bg-card border rounded-md flex items-center gap-2 group hover:border-primary transition-all ${
            snapshot.isDragging ? "shadow-lg ring-2 ring-primary" : ""
          }`}
        >
          <div {...provided.dragHandleProps} className="text-muted-foreground hover:text-primary transition-colors">
            <GripVertical className="h-4 w-4" />
          </div>
          <span>{field}</span>
        </motion.div>
      )}
    </Draggable>
  );
};