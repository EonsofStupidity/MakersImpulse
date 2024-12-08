import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TemplateElement } from "../TemplateCanvas";

interface BasicPropertiesProps {
  element: TemplateElement;
  onPropertyChange: (property: string, value: any) => void;
}

export const BasicProperties = ({ element, onPropertyChange }: BasicPropertiesProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Label</Label>
        <Input
          value={element.properties.label || ""}
          onChange={e => onPropertyChange("label", e.target.value)}
          placeholder="Field label"
        />
      </div>

      <div className="space-y-2">
        <Label>Type</Label>
        <Select
          value={element.type}
          onValueChange={value => onPropertyChange("type", value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="textarea">Textarea</SelectItem>
            <SelectItem value="select">Select</SelectItem>
            <SelectItem value="switch">Switch</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Help Text</Label>
        <Textarea
          value={element.properties.helpText || ""}
          onChange={e => onPropertyChange("helpText", e.target.value)}
          placeholder="Help text for this field"
        />
      </div>
    </div>
  );
};