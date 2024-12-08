import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TemplateElement } from "../TemplateCanvas";

interface StylePropertiesProps {
  element: TemplateElement;
  onStyleChange: (property: string, value: string) => void;
}

export const StyleProperties = ({ element, onStyleChange }: StylePropertiesProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Width</Label>
        <Select
          value={element.styles?.width || "100%"}
          onValueChange={value => onStyleChange("width", value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="100%">Full</SelectItem>
            <SelectItem value="75%">Three Quarters</SelectItem>
            <SelectItem value="50%">Half</SelectItem>
            <SelectItem value="25%">Quarter</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Alignment</Label>
        <Select
          value={element.styles?.textAlign || "left"}
          onValueChange={value => onStyleChange("textAlign", value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};