import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { TemplateElement } from "../TemplateCanvas";

interface AdvancedPropertiesProps {
  element: TemplateElement;
  onPropertyChange: (property: string, value: any) => void;
}

export const AdvancedProperties = ({ element, onPropertyChange }: AdvancedPropertiesProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          checked={element.properties.required || false}
          onCheckedChange={checked => onPropertyChange("required", checked)}
        />
        <Label>Required Field</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          checked={element.properties.readonly || false}
          onCheckedChange={checked => onPropertyChange("readonly", checked)}
        />
        <Label>Read Only</Label>
      </div>

      {element.type === "text" && (
        <div className="space-y-2">
          <Label>Validation Pattern</Label>
          <Input
            value={element.properties.pattern || ""}
            onChange={e => onPropertyChange("pattern", e.target.value)}
            placeholder="Regular expression pattern"
          />
        </div>
      )}
    </div>
  );
};