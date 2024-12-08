import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, PaintBucket, Brush, SlidersHorizontal } from "lucide-react";
import StyleEditor from "@/components/builder/StyleEditor";

const StyleInterface = () => {
  const [config, setConfig] = useState({
    colors: {
      primary: "#FF1B6B",
      secondary: "#1A1F2C",
      accent: "#6E1BFF",
    },
    typography: {
      headingFont: "Inter",
      bodyFont: "Inter",
    },
    layout: {
      contentWidth: "contained",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Style Customization</h2>
      </div>

      <Card className="p-6">
        <Tabs defaultValue="editor" className="space-y-4">
          <TabsList>
            <TabsTrigger value="editor" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Style Editor
            </TabsTrigger>
            <TabsTrigger value="themes" className="flex items-center gap-2">
              <PaintBucket className="h-4 w-4" />
              Themes
            </TabsTrigger>
            <TabsTrigger value="presets" className="flex items-center gap-2">
              <Brush className="h-4 w-4" />
              Presets
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="editor">
            <StyleEditor config={config} onChange={setConfig} />
          </TabsContent>

          <TabsContent value="themes">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Theme cards will go here */}
            </div>
          </TabsContent>

          <TabsContent value="presets">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Preset cards will go here */}
            </div>
          </TabsContent>

          <TabsContent value="advanced">
            <div className="space-y-4">
              {/* Advanced customization options will go here */}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default StyleInterface;