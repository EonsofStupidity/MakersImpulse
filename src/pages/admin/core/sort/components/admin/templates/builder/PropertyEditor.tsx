import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TemplateElement } from "./TemplateCanvas";
import { BasicProperties } from "./property-editor/BasicProperties";
import { LayoutProperties } from "./property-editor/LayoutProperties";
import { StyleProperties } from "./property-editor/StyleProperties";
import { AdvancedProperties } from "./property-editor/AdvancedProperties";

interface PropertyEditorProps {
  elements: TemplateElement[];
  onElementsChange: (elements: TemplateElement[]) => void;
}

export const PropertyEditor = ({ elements, onElementsChange }: PropertyEditorProps) => {
  const [selectedTab, setSelectedTab] = useState("basic");

  const handlePropertyChange = (elementId: string, property: string, value: any) => {
    const newElements = elements.map(element => {
      if (element.id === elementId) {
        return {
          ...element,
          properties: {
            ...element.properties,
            [property]: value
          }
        };
      }
      return element;
    });
    onElementsChange(newElements);
  };

  const handleGridChange = (elementId: string, changes: Partial<{ column: number; row: number; span: number }>) => {
    const newElements = elements.map(element => {
      if (element.id === elementId) {
        return {
          ...element,
          gridPosition: {
            ...element.gridPosition,
            ...changes
          }
        };
      }
      return element;
    });
    onElementsChange(newElements);
  };

  const handleStyleChange = (elementId: string, property: string, value: string) => {
    const newElements = elements.map(element => {
      if (element.id === elementId) {
        return {
          ...element,
          styles: {
            ...(element.styles || {}),
            [property]: value
          }
        };
      }
      return element;
    });
    onElementsChange(newElements);
  };

  return (
    <div className="space-y-6">
      {elements.map(element => (
        <Card key={element.id} className="p-4">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="w-full">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
              <TabsTrigger value="style">Style</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <BasicProperties 
                element={element}
                onPropertyChange={(prop, value) => handlePropertyChange(element.id, prop, value)}
              />
            </TabsContent>

            <TabsContent value="layout">
              <LayoutProperties 
                element={element}
                onGridChange={(changes) => handleGridChange(element.id, changes)}
              />
            </TabsContent>

            <TabsContent value="style">
              <StyleProperties 
                element={element}
                onStyleChange={(prop, value) => handleStyleChange(element.id, prop, value)}
              />
            </TabsContent>

            <TabsContent value="advanced">
              <AdvancedProperties 
                element={element}
                onPropertyChange={(prop, value) => handlePropertyChange(element.id, prop, value)}
              />
            </TabsContent>
          </Tabs>
        </Card>
      ))}
    </div>
  );
};