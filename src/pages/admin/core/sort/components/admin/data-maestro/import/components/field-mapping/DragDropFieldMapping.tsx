import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { DroppableFieldList } from "./components/DroppableFieldList";
import { MappedFields } from "./components/MappedFields";
import { AutoMapButton } from "./components/AutoMapButton";
import { useToast } from "@/components/ui/use-toast";
import { GridOverlay } from "./components/GridOverlay";

interface DragDropFieldMappingProps {
  sourceFields: string[];
  targetFields: string[];
  mappings: Record<string, string>;
  onUpdateMapping: (mappings: Record<string, string>) => void;
  gridSettings?: {
    columns: number;
    showGrid: boolean;
    snapToGrid: boolean;
    cellSize: number;
    gap: number;
  };
}

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
  const [mappedFields, setMappedFields] = useState(
    Object.entries(mappings).map(([source, target]) => ({
      sourceField: source,
      targetField: target,
      gridPosition: { column: 1, row: 1, span: 1 }
    }))
  );
  const [draggedField, setDraggedField] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDragStart = (result: any) => {
    setDraggedField(result.draggableId);
  };

  const handleDragEnd = (result: DropResult) => {
    setDraggedField(null);
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === "available" && destination.droppableId === "mapped") {
      const field = availableFields[source.index];
      setAvailableFields(prev => prev.filter((_, i) => i !== source.index));
      
      const column = Math.floor((destination.x / (gridSettings.cellSize + gridSettings.gap)) + 1);
      const row = Math.floor((destination.y / (gridSettings.cellSize + gridSettings.gap)) + 1);
      
      setMappedFields(prev => [
        ...prev,
        {
          sourceField: field,
          targetField: "",
          gridPosition: { 
            column: Math.min(column, gridSettings.columns), 
            row, 
            span: 1 
          }
        }
      ]);
    }

    if (source.droppableId === "mapped" && destination.droppableId === "mapped") {
      const newMappedFields = Array.from(mappedFields);
      const [removed] = newMappedFields.splice(source.index, 1);
      newMappedFields.splice(destination.index, 0, removed);
      setMappedFields(newMappedFields);
      updateParentMappings(newMappedFields);
    }
  };

  const handleAutoMap = () => {
    const newMappings: Record<string, string> = {};
    availableFields.forEach(sourceField => {
      const exactMatch = targetFields.find(target => 
        target.toLowerCase() === sourceField.toLowerCase()
      );
      if (exactMatch) {
        newMappings[sourceField] = exactMatch;
        return;
      }

      const partialMatch = targetFields.find(target => 
        target.toLowerCase().includes(sourceField.toLowerCase()) ||
        sourceField.toLowerCase().includes(target.toLowerCase())
      );
      if (partialMatch) {
        newMappings[sourceField] = partialMatch;
      }
    });

    if (Object.keys(newMappings).length > 0) {
      handleBulkMapping(newMappings);
      toast({
        title: "Auto-mapping Complete",
        description: `Successfully mapped ${Object.keys(newMappings).length} fields`,
      });
    } else {
      toast({
        title: "Auto-mapping Failed",
        description: "No matching fields found",
        variant: "destructive"
      });
    }
  };

  const handleTargetFieldSelect = (sourceField: string, targetField: string) => {
    const updatedFields = mappedFields.map(field => 
      field.sourceField === sourceField ? { ...field, targetField } : field
    );
    setMappedFields(updatedFields);
    updateParentMappings(updatedFields);
  };

  const handleBulkMapping = (newMappings: Record<string, string>) => {
    const updatedFields = Object.entries(newMappings).map(([source, target], index) => ({
      sourceField: source,
      targetField: target,
      gridPosition: { column: 1, row: index + 1, span: 1 }
    }));
    
    setMappedFields(updatedFields);
    setAvailableFields(sourceFields.filter(field => !Object.keys(newMappings).includes(field)));
    updateParentMappings(updatedFields);
  };

  const updateParentMappings = (fields: typeof mappedFields) => {
    const newMappings = fields.reduce((acc, { sourceField, targetField }) => {
      if (targetField) acc[sourceField] = targetField;
      return acc;
    }, {} as Record<string, string>);
    onUpdateMapping(newMappings);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Field Mapping</h3>
        <AutoMapButton onAutoMap={handleAutoMap} />
      </div>

      <DragDropContext 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-2 gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <DroppableFieldList
                id="available"
                title="Available Fields"
                fields={availableFields}
                draggedField={draggedField}
                gridSettings={gridSettings}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="relative"
            >
              <Card className="p-4">
                <h3 className="font-medium mb-4">Mapped Fields</h3>
                <div className="relative min-h-[200px]">
                  {gridSettings.showGrid && (
                    <GridOverlay
                      columns={gridSettings.columns}
                      cellSize={gridSettings.cellSize}
                      gap={gridSettings.gap}
                      isDraggingOver={!!draggedField}
                    />
                  )}
                  <MappedFields
                    fields={mappedFields}
                    targetFields={targetFields}
                    onTargetFieldSelect={handleTargetFieldSelect}
                    gridSettings={gridSettings}
                    draggedField={draggedField}
                  />
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </DragDropContext>
    </div>
  );
};