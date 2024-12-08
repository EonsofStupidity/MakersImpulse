import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";
import { TemplateElement } from "../TemplateCanvas";

interface FieldElementProps {
  element: TemplateElement;
  isSelected: boolean;
  onClick: () => void;
}

export const FieldElement = ({ element, isSelected, onClick }: FieldElementProps) => {
  return (
    <Card
      className={cn(
        "p-4 cursor-move transition-all",
        isSelected && "ring-2 ring-primary",
        "hover:shadow-md"
      )}
      onClick={onClick}
      style={{
        width: element.size.width,
        height: element.size.height
      }}
    >
      <div className="flex items-center gap-2">
        <GripVertical className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{element.type}</span>
      </div>
      <div className="mt-2 text-sm text-muted-foreground">
        {element.properties.label || element.type}
      </div>
    </Card>
  );
};