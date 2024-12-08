import { useState } from "react";
import { Card } from "@/components/ui/card";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import { GridOverlay } from "./components/GridOverlay";
import { FieldElement } from "./components/FieldElement";
import { useToast } from "@/components/ui/use-toast";

interface TemplateCanvasProps {
  elements: TemplateElement[];
  onElementsChange: (elements: TemplateElement[]) => void;
  gridSettings: GridSettings;
}

export interface TemplateElement {
  id: string;
  type: string;
  position: { x: number; y: number };
  size: { width: string; height: string };
  properties: Record<string, any>;
  gridPosition: { column: number; row: number; span: number };
}

interface GridSettings {
  columns: number;
  showGrid: boolean;
  snapToGrid: boolean;
}

export const TemplateCanvas = ({ elements, onElementsChange, gridSettings }: TemplateCanvasProps) => {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newElements = Array.from(elements);
    const [reorderedItem] = newElements.splice(result.source.index, 1);
    newElements.splice(result.destination.index, 0, reorderedItem);

    // Update grid position based on drop location
    if (gridSettings.snapToGrid) {
      const column = Math.floor((result.destination.x / window.innerWidth) * gridSettings.columns) + 1;
      reorderedItem.gridPosition = {
        ...reorderedItem.gridPosition,
        column: Math.max(1, Math.min(column, gridSettings.columns))
      };
    }

    onElementsChange(newElements);
    toast({
      title: "Element moved",
      description: "The element position has been updated."
    });
  };

  return (
    <Card className="relative min-h-[600px] p-6 bg-background">
      {gridSettings.showGrid && <GridOverlay columns={gridSettings.columns} />}
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="template-canvas">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="relative min-h-[600px]"
            >
              {elements.map((element, index) => (
                <Draggable key={element.id} draggableId={element.id} index={index}>
                  {(provided, snapshot) => (
                    <motion.div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`absolute ${snapshot.isDragging ? "z-50" : ""}`}
                      style={{
                        gridColumn: `span ${element.gridPosition.span}`,
                        transform: `translate(${element.position.x}px, ${element.position.y}px)`,
                        ...provided.draggableProps.style
                      }}
                    >
                      <FieldElement
                        element={element}
                        isSelected={selectedElement === element.id}
                        onClick={() => setSelectedElement(element.id)}
                      />
                    </motion.div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Card>
  );
};