import { motion } from "framer-motion";
import { Draggable } from "react-beautiful-dnd";
import { Badge } from "@/components/ui/badge";
import { GripVertical } from "lucide-react";

interface DraggableFieldProps {
  field: string;
  index: number;
  isDragging: boolean;
}

export const DraggableField = ({ field, index, isDragging }: DraggableFieldProps) => {
  return (
    <Draggable draggableId={field} index={index}>
      {(provided, snapshot) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.draggableProps}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            scale: snapshot.isDragging ? 1.02 : 1,
            boxShadow: snapshot.isDragging ? "0 10px 25px -5px rgba(0,0,0,0.1)" : "none"
          }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: 0.2,
            type: "spring",
            stiffness: 500,
            damping: 25
          }}
          className={`p-3 bg-card border rounded-md flex items-center gap-2 group hover:border-primary transition-all ${
            snapshot.isDragging ? "shadow-lg ring-2 ring-primary" : ""
          }`}
        >
          <div 
            {...provided.dragHandleProps} 
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <GripVertical className="h-4 w-4" />
          </div>
          <span className="font-medium">{field}</span>
        </motion.div>
      )}
    </Draggable>
  );
};