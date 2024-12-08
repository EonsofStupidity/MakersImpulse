import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StyleEditorProps {
  config: any;
  onChange: (config: any) => void;
}

const StyleEditor = ({ config, onChange }: StyleEditorProps) => {
  const updateConfig = (key: string, value: any) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <Tabs defaultValue="colors">
      <TabsList>
        <TabsTrigger value="colors">Colors</TabsTrigger>
        <TabsTrigger value="typography">Typography</TabsTrigger>
        <TabsTrigger value="layout">Layout</TabsTrigger>
      </TabsList>

      <TabsContent value="colors" className="space-y-4">
        <div>
          <Label>Background Color</Label>
          <Input
            type="color"
            value={config.backgroundColor || "#ffffff"}
            onChange={(e) => updateConfig("backgroundColor", e.target.value)}
          />
        </div>
        <div>
          <Label>Text Color</Label>
          <Input
            type="color"
            value={config.textColor || "#000000"}
            onChange={(e) => updateConfig("textColor", e.target.value)}
          />
        </div>
        <div>
          <Label>Accent Color</Label>
          <Input
            type="color"
            value={config.accentColor || "#0066cc"}
            onChange={(e) => updateConfig("accentColor", e.target.value)}
          />
        </div>
      </TabsContent>

      <TabsContent value="typography" className="space-y-4">
        <div>
          <Label>Heading Font</Label>
          <Select
            value={config.headingFont || "Inter"}
            onValueChange={(value) => updateConfig("headingFont", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Inter">Inter</SelectItem>
              <SelectItem value="Roboto">Roboto</SelectItem>
              <SelectItem value="Poppins">Poppins</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Body Font</Label>
          <Select
            value={config.bodyFont || "Inter"}
            onValueChange={(value) => updateConfig("bodyFont", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Inter">Inter</SelectItem>
              <SelectItem value="Roboto">Roboto</SelectItem>
              <SelectItem value="Poppins">Poppins</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </TabsContent>

      <TabsContent value="layout" className="space-y-4">
        <div>
          <Label>Content Width</Label>
          <Select
            value={config.contentWidth || "contained"}
            onValueChange={(value) => updateConfig("contentWidth", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="contained">Contained</SelectItem>
              <SelectItem value="full">Full Width</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default StyleEditor;