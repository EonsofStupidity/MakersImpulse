import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Card } from "@/components/ui/card";
import { AnimatePresence } from "framer-motion";
import { AvailableFields } from "./field-mapping/AvailableFields";
import { MappedFields } from "./field-mapping/MappedFields";
import { DragDropFieldMappingProps, MappedField } from "./field-mapping/types";

export const DragDropFieldMapping = ({
  sourceFields,
  targetFields,
  mappings,
  onUpdateMapping,
  gridSettings = {
    columns: 12,
    showGrid: true,
    snapToGrid: true,
    cellSize: 60,
    gap: 16
  }
}: DragDropFieldMappingProps) => {
  const [availableFields, setAvailableFields] = useState(
    sourceFields.filter(field => !Object.keys(mappings).includes(field))
  );
  const [mappedFields, setMappedFields] = useState<MappedField[]>(
    Object.entries(mappings).map(([source, target]) => ({ 
      source, 
      target, 
      gridPosition: { column: 1, row: 1, span: 1 }
    }))
  );

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === "available" && destination.droppableId === "mapped") {
      const field = availableFields[source.index];
      setAvailableFields(prev => prev.filter((_, i) => i !== source.index));
      setMappedFields(prev => [...prev, { 
        source: field, 
        target: "", 
        gridPosition: { column: 1, row: 1, span: 1 }
      }]);
    }

    if (source.droppableId === "mapped" && destination.droppableId === "mapped") {
      const newMappedFields = Array.from(mappedFields);
      const [removed] = newMappedFields.splice(source.index, 1);
      newMappedFields.splice(destination.index, 0, removed);
      setMappedFields(newMappedFields);
      updateParentMappings(newMappedFields);
    }
  };

  const handleRemoveMapping = (index: number) => {
    const removed = mappedFields[index];
    setMappedFields(prev => prev.filter((_, i) => i !== index));
    setAvailableFields(prev => [...prev, removed.source]);
  };

  const handleTargetFieldSelect = (index: number, targetField: string) => {
    const newMappedFields = [...mappedFields];
    newMappedFields[index].target = targetField;
    setMappedFields(newMappedFields);
    updateParentMappings(newMappedFields);
  };

  const updateParentMappings = (fields: MappedField[]) => {
    const newMappings = fields.reduce((acc, { source, target }) => {
      if (target) acc[source] = target;
      return acc;
    }, {} as Record<string, string>);
    onUpdateMapping(newMappings);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="font-medium mb-4">Available Fields</h3>
          <AvailableFields fields={availableFields} />
        </Card>

        <Card className="p-4">
          <h3 className="font-medium mb-4">Mapped Fields</h3>
          <AnimatePresence>
            <MappedFields
              fields={mappedFields}
              targetFields={targetFields}
              onTargetFieldSelect={handleTargetFieldSelect}
              onRemove={handleRemoveMapping}
            />
          </AnimatePresence>
        </Card>
      </div>
    </DragDropContext>
  );
};