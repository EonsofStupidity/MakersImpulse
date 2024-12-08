import { useState, useRef, useEffect } from "react";
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
  styles?: {
    width?: string;
    textAlign?: string;
    [key: string]: string | undefined;
  };
}

interface GridSettings {
  columns: number;
  showGrid: boolean;
  snapToGrid: boolean;
  cellSize: number;
  gap: number;
}

export const TemplateCanvas = ({ elements, onElementsChange, gridSettings }: TemplateCanvasProps) => {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [highlightedCell, setHighlightedCell] = useState<{row: number, column: number} | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const calculateGridPosition = (x: number, y: number) => {
    if (!canvasRef.current) return { column: 1, row: 1 };
    
    const rect = canvasRef.current.getBoundingClientRect();
    const { cellSize, gap, columns } = gridSettings;
    
    // Calculate total width of cells and gaps
    const totalGapWidth = (columns - 1) * gap;
    const availableWidth = rect.width - totalGapWidth;
    const cellWidth = availableWidth / columns;
    
    // Calculate grid position
    const column = Math.max(1, Math.min(
      Math.round(x / (cellWidth + gap)) + 1,
      columns
    ));
    const row = Math.max(1, Math.round(y / (cellSize + gap)) + 1);
    
    return { column, row };
  };

  const calculatePixelPosition = (column: number, row: number) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    
    const rect = canvasRef.current.getBoundingClientRect();
    const { cellSize, gap, columns } = gridSettings;
    
    const totalGapWidth = (columns - 1) * gap;
    const availableWidth = rect.width - totalGapWidth;
    const cellWidth = availableWidth / columns;
    
    const x = (column - 1) * (cellWidth + gap);
    const y = (row - 1) * (cellSize + gap);
    
    return { x, y };
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    setHighlightedCell(null);

    const newElements = Array.from(elements);
    const [reorderedItem] = newElements.splice(result.source.index, 1);
    newElements.splice(result.destination.index, 0, reorderedItem);

    if (gridSettings.snapToGrid) {
      const { x, y } = { x: result.destination.x, y: result.destination.y };
      const gridPosition = calculateGridPosition(x, y);
      const pixelPosition = calculatePixelPosition(gridPosition.column, gridPosition.row);

      reorderedItem.gridPosition = {
        ...reorderedItem.gridPosition,
        ...gridPosition
      };
      reorderedItem.position = pixelPosition;
    }

    onElementsChange(newElements);
    toast({
      title: "Element moved",
      description: "The element position has been updated."
    });
  };

  const handleDragUpdate = (update: any) => {
    if (!update.destination || !gridSettings.snapToGrid) return;
    
    const gridPosition = calculateGridPosition(
      update.destination.x,
      update.destination.y
    );
    setHighlightedCell(gridPosition);
  };

  useEffect(() => {
    const handleResize = () => {
      // Recalculate positions for all elements
      const updatedElements = elements.map(element => {
        const pixelPosition = calculatePixelPosition(
          element.gridPosition.column,
          element.gridPosition.row
        );
        return {
          ...element,
          position: pixelPosition
        };
      });
      onElementsChange(updatedElements);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [elements, gridSettings]);

  return (
    <Card className="relative min-h-[600px] p-6 bg-background">
      {gridSettings.showGrid && (
        <GridOverlay 
          columns={gridSettings.columns}
          cellSize={gridSettings.cellSize}
          gap={gridSettings.gap}
          highlightedCell={highlightedCell}
        />
      )}
      
      <DragDropContext onDragEnd={handleDragEnd} onDragUpdate={handleDragUpdate}>
        <Droppable droppableId="template-canvas">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={(el) => {
                provided.innerRef(el);
                if (canvasRef) canvasRef.current = el;
              }}
              className="template-canvas relative min-h-[600px]"
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
                        width: element.size.width,
                        height: element.size.height,
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
