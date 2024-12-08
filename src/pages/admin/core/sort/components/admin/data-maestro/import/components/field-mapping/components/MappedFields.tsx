import { Droppable } from "react-beautiful-dnd";
import { motion, AnimatePresence } from "framer-motion";
import { MappedFieldItem } from "./MappedFieldItem";

interface MappedFieldsProps {
  fields: Array<{
    sourceField: string;
    targetField: string;
    gridPosition: { column: number; row: number; span: number; }
  }>;
  targetFields: string[];
  onTargetFieldSelect: (sourceField: string, targetField: string) => void;
  gridSettings: {
    columns: number;
    showGrid: boolean;
    snapToGrid: boolean;
    cellSize: number;
    gap: number;
  };
  draggedField: string | null;
}

export const MappedFields = ({
  fields,
  targetFields,
  onTargetFieldSelect,
  gridSettings,
  draggedField
}: MappedFieldsProps) => {
  return (
    <Droppable droppableId="mapped">
      {(provided, snapshot) => (
        <motion.div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="relative min-h-[200px]"
          animate={{
            backgroundColor: snapshot.isDraggingOver ? "rgba(0,0,0,0.05)" : "transparent",
            transition: { duration: 0.2 }
          }}
        >
          <AnimatePresence>
            {fields.map((field, index) => (
              <MappedFieldItem
                key={field.sourceField}
                sourceField={field.sourceField}
                targetField={field.targetField}
                targetFields={targetFields}
                onTargetFieldSelect={onTargetFieldSelect}
                gridPosition={field.gridPosition}
                cellSize={gridSettings.cellSize}
                gap={gridSettings.gap}
              />
            ))}
          </AnimatePresence>
          {provided.placeholder}
        </motion.div>
      )}
    </Droppable>
  );
};