import { Layout, Palette, Type } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ElementList from "./ElementList";
import StyleEditor from "../StyleEditor";
import TemplateSelector from "../TemplateSelector";
import { BuilderElement, BuilderPage } from "@/types/builder";

interface BuilderTabsProps {
  activeTab: string;
  elements: BuilderElement[];
  page: BuilderPage;
  onTabChange: (value: string) => void;
  onElementsChange: (elements: BuilderElement[]) => void;
  onStyleChange: (style_config: any) => void;
  onTemplateChange: (template_id: string) => void;
}

const BuilderTabs = ({
  activeTab,
  elements,
  page,
  onTabChange,
  onElementsChange,
  onStyleChange,
  onTemplateChange,
}: BuilderTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList>
        <TabsTrigger value="content">
          <Layout className="w-4 h-4 mr-2" />
          Content
        </TabsTrigger>
        <TabsTrigger value="style">
          <Palette className="w-4 h-4 mr-2" />
          Style
        </TabsTrigger>
        <TabsTrigger value="template">
          <Type className="w-4 h-4 mr-2" />
          Template
        </TabsTrigger>
      </TabsList>

      <TabsContent value="content">
        <ElementList 
          elements={elements} 
          onChange={onElementsChange} 
        />
      </TabsContent>

      <TabsContent value="style">
        <StyleEditor
          config={page.style_config}
          onChange={onStyleChange}
        />
      </TabsContent>

      <TabsContent value="template">
        <TemplateSelector
          selectedTemplate={page.template_id}
          onSelect={onTemplateChange}
        />
      </TabsContent>
    </Tabs>
  );
};

export default BuilderTabs;