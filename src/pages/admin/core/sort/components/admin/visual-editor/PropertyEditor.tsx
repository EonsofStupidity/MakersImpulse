import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TemplateElement } from "./TemplateCanvas";

interface PropertyEditorProps {
  elements: TemplateElement[];
  onElementsChange: (elements: TemplateElement[]) => void;
}

export const PropertyEditor = ({ elements, onElementsChange }: PropertyEditorProps) => {
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

  return (
    <div className="space-y-4">
      {elements.map(element => (
        <div key={element.id} className="space-y-4 p-4 border rounded-lg">
          <div className="space-y-2">
            <Label>Label</Label>
            <Input
              value={element.properties.label || ""}
              onChange={e => handlePropertyChange(element.id, "label", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Type</Label>
            <Select
              value={element.type}
              onValueChange={value => handlePropertyChange(element.id, "type", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="select">Select</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Grid Span</Label>
            <Select
              value={element.gridPosition.span.toString()}
              onValueChange={value => {
                const newElements = elements.map(el => {
                  if (el.id === element.id) {
                    return {
                      ...el,
                      gridPosition: {
                        ...el.gridPosition,
                        span: parseInt(value)
                      }
                    };
                  }
                  return el;
                });
                onElementsChange(newElements);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 6, 12].map(span => (
                  <SelectItem key={span} value={span.toString()}>
                    Span {span}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      ))}
    </div>
  );
};