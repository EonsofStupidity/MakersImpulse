import { useState, useRef, useEffect } from "react";
import { motion, Reorder } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Grid, Layout } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BuilderElement } from "@/types/builder";
import ElementToolbar from "./ElementToolbar";
import GridOverlay from "./GridOverlay";
import { useToast } from "@/components/ui/use-toast";

interface DragDropEditorProps {
  elements: BuilderElement[];
  onElementsChange: (elements: BuilderElement[]) => void;
  gridSettings: {
    columns: number;
    show_grid: boolean;
    snap_to_grid: boolean;
  };
}

const DragDropEditor = ({ elements, onElementsChange, gridSettings }: DragDropEditorProps) => {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateElementPosition = useMutation({
    mutationFn: async ({ elementId, position }: { elementId: string, position: { x: number, y: number } }) => {
      const { data: currentPage } = await supabase
        .from('builder_pages')
        .select('*')
        .single();

      if (!currentPage) throw new Error('No page found');

      const pageContent = typeof currentPage.content === 'string' 
        ? JSON.parse(currentPage.content) 
        : currentPage.content;

      const updatedElements = pageContent.elements.map((el: BuilderElement) => 
        el.id === elementId ? { ...el, position } : el
      );

      const { error } = await supabase
        .from('builder_pages')
        .update({ 
          content: { 
            ...pageContent, 
            elements: updatedElements 
          } 
        })
        .eq('id', currentPage.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['builder-page'] });
    }
  });

  const handleDragEnd = (elementId: string, position: { x: number, y: number }) => {
    if (gridSettings.snap_to_grid) {
      position = {
        x: Math.round(position.x / (editorRef.current?.clientWidth || 1) * gridSettings.columns) * (editorRef.current?.clientWidth || 1) / gridSettings.columns,
        y: Math.round(position.y / 10) * 10
      };
    }
    updateElementPosition.mutate({ elementId, position });
  };

  return (
    <div className="relative min-h-[500px] bg-background border rounded-lg">
      {gridSettings.show_grid && <GridOverlay columns={gridSettings.columns} />}
      
      <div ref={editorRef} className="relative p-4">
        <Reorder.Group
          axis="y"
          values={elements}
          onReorder={onElementsChange}
          className="space-y-2"
        >
          {elements.map((element) => (
            <Reorder.Item
              key={element.id}
              value={element}
              dragListener={false}
            >
              <motion.div
                drag
                dragConstraints={editorRef}
                onDragEnd={(_, info) => handleDragEnd(element.id, {
                  x: info.point.x,
                  y: info.point.y
                })}
                className={`relative ${
                  selectedElement === element.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedElement(element.id)}
              >
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="capitalize">{element.type}</span>
                    {selectedElement === element.id && (
                      <ElementToolbar
                        element={element}
                        onDelete={() => {
                          onElementsChange(elements.filter((e) => e.id !== element.id));
                          setSelectedElement(null);
                        }}
                      />
                    )}
                  </div>
                  {element.type === "text" && (
                    <div className="mt-2">{element.content.text || "Text Block"}</div>
                  )}
                  {element.type === "image" && element.content.url && (
                    <img
                      src={element.content.url}
                      alt={element.content.alt || ""}
                      className="mt-2 max-w-full h-auto rounded"
                    />
                  )}
                </Card>
              </motion.div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
};

export default DragDropEditor;