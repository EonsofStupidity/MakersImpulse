import { Droppable } from "react-beautiful-dnd";
import { Card } from "@/components/ui/card";
import { AnimatePresence } from "framer-motion";
import { DraggableFieldItem } from "./DraggableFieldItem";

interface DroppableFieldListProps {
  id: string;
  title: string;
  fields: string[];
  draggedField: string | null;
  gridSettings: {
    columns: number;
    showGrid: boolean;
    snapToGrid: boolean;
    cellSize: number;
    gap: number;
  };
}

export const DroppableFieldList = ({
  id,
  title,
  fields,
  draggedField,
  gridSettings,
}: DroppableFieldListProps) => {
  return (
    <Card className="p-4 bg-background">
      <h3 className="font-medium mb-4 text-lg">{title}</h3>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`space-y-2 min-h-[200px] rounded-lg transition-colors ${
              snapshot.isDraggingOver ? "bg-muted/50 ring-2 ring-primary/20" : ""
            }`}
          >
            <AnimatePresence>
              {fields.map((field, index) => (
                <DraggableFieldItem
                  key={field}
                  field={field}
                  index={index}
                  isDragging={draggedField === field}
                />
              ))}
            </AnimatePresence>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Card>
  );
};