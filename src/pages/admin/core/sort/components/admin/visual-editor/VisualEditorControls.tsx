import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCurrentPage } from "./hooks/useCurrentPage";
import { usePageMutations } from "./hooks/usePageMutations";
import { ToolbarControls } from "./components/ToolbarControls";
import { GridSettings } from "./components/GridSettings";

// Define the tools array with their default content
const tools = [
  {
    id: "text",
    defaultContent: {
      type: "text",
      position: { x: 0, y: 0 },
      size: { width: "100%", height: "auto" },
      properties: { label: "Text Field", type: "text" },
      gridPosition: { column: 1, row: 1, span: 1 }
    }
  },
  {
    id: "number",
    defaultContent: {
      type: "number",
      position: { x: 0, y: 0 },
      size: { width: "100%", height: "auto" },
      properties: { label: "Number Field", type: "number" },
      gridPosition: { column: 1, row: 1, span: 1 }
    }
  },
  {
    id: "select",
    defaultContent: {
      type: "select",
      position: { x: 0, y: 0 },
      size: { width: "100%", height: "auto" },
      properties: { label: "Select Field", type: "select" },
      gridPosition: { column: 1, row: 1, span: 1 }
    }
  }
];

const VisualEditorControls = () => {
  const [gridEnabled, setGridEnabled] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [gridColumns, setGridColumns] = useState(12);

  const { data: currentPage, isError } = useCurrentPage();
  const { updatePage } = usePageMutations(gridColumns, gridEnabled, snapToGrid);

  const handleAddElement = async (toolId: string) => {
    if (!currentPage) return;

    const tool = tools.find(t => t.id === toolId);
    if (!tool) return;

    const currentContent = typeof currentPage.content === 'string' 
      ? JSON.parse(currentPage.content) 
      : currentPage.content;

    const newElement = {
      id: `element-${Date.now()}`,
      ...tool.defaultContent
    };

    const updatedContent = {
      ...currentContent,
      elements: [...(currentContent.elements || []), newElement]
    };

    updatePage.mutate({ 
      content: updatedContent,
      visual_editor_settings: {
        grid: {
          enabled: gridEnabled,
          columns: gridColumns,
          gap: 16
        },
        snap_to_grid: snapToGrid,
        show_guidelines: true
      }
    });
  };

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load the page. Please try refreshing.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col space-y-4"
    >
      <div className="flex items-center justify-between">
        <ToolbarControls onAddElement={handleAddElement} />
        
        <Separator orientation="vertical" className="h-6 mx-4" />
        
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden md:inline">Add Page</span>
        </Button>
      </div>

      <GridSettings
        gridEnabled={gridEnabled}
        setGridEnabled={setGridEnabled}
        snapToGrid={snapToGrid}
        setSnapToGrid={setSnapToGrid}
        gridColumns={gridColumns}
        setGridColumns={setGridColumns}
      />
    </motion.div>
  );
};

export default VisualEditorControls;