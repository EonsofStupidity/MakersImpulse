import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TemplateElement } from "../TemplateCanvas";

interface LayoutPropertiesProps {
  element: TemplateElement;
  onGridChange: (changes: Partial<{ column: number; row: number; span: number }>) => void;
}

export const LayoutProperties = ({ element, onGridChange }: LayoutPropertiesProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label>Column</Label>
        <Input
          type="number"
          min={1}
          max={12}
          value={element.gridPosition.column}
          onChange={e => onGridChange({ column: parseInt(e.target.value) })}
        />
      </div>
      <div className="space-y-2">
        <Label>Row</Label>
        <Input
          type="number"
          min={1}
          value={element.gridPosition.row}
          onChange={e => onGridChange({ row: parseInt(e.target.value) })}
        />
      </div>
      <div className="space-y-2">
        <Label>Span</Label>
        <Select
          value={element.gridPosition.span.toString()}
          onValueChange={value => onGridChange({ span: parseInt(value) })}
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
  );
};