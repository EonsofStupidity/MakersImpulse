import { useState } from "react";
import { TemplateCanvas, TemplateElement } from "./TemplateCanvas";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { PropertyEditor } from "./PropertyEditor";
import { ResponsiveControls } from "./ResponsiveControls";

export const VisualTemplateBuilder = () => {
  const [elements, setElements] = useState<TemplateElement[]>([]);
  const [gridSettings, setGridSettings] = useState({
    columns: 12,
    showGrid: true,
    snapToGrid: true
  });
  const [selectedBreakpoint, setSelectedBreakpoint] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const { toast } = useToast();

  const handleElementsChange = (newElements: TemplateElement[]) => {
    setElements(newElements);
  };

  const handleGridSettingsChange = (settings: typeof gridSettings) => {
    setGridSettings(settings);
    toast({
      title: "Grid settings updated",
      description: "The template grid has been updated."
    });
  };

  return (
    <div className="space-y-6">
      <ResponsiveControls
        selectedBreakpoint={selectedBreakpoint}
        onBreakpointChange={setSelectedBreakpoint}
        gridSettings={gridSettings}
        onGridSettingsChange={handleGridSettingsChange}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <TemplateCanvas
            elements={elements}
            onElementsChange={handleElementsChange}
            gridSettings={gridSettings}
          />
        </div>

        <Card className="p-4">
          <Tabs defaultValue="properties">
            <TabsList className="w-full">
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
            </TabsList>
            <TabsContent value="properties">
              <PropertyEditor
                elements={elements}
                onElementsChange={handleElementsChange}
              />
            </TabsContent>
            <TabsContent value="layout">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Layout Settings</h3>
                {/* Layout settings content */}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};