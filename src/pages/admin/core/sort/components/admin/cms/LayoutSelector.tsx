import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Layout, Columns, AlignJustify } from "lucide-react";

interface LayoutSelectorProps {
  selectedLayout: string;
  onLayoutChange: (layout: string) => void;
}

const layouts = [
  {
    id: "default",
    name: "Default",
    icon: Layout,
    description: "Standard single column layout",
  },
  {
    id: "two-column",
    name: "Two Columns",
    icon: Columns,
    description: "Split content into two columns",
  },
  {
    id: "full-width",
    name: "Full Width",
    icon: AlignJustify,
    description: "Edge-to-edge content layout",
  },
];

const LayoutSelector = ({ selectedLayout, onLayoutChange }: LayoutSelectorProps) => {
  return (
    <RadioGroup
      value={selectedLayout}
      onValueChange={onLayoutChange}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {layouts.map((layout) => {
        const Icon = layout.icon;
        return (
          <Card
            key={layout.id}
            className={`relative p-4 cursor-pointer transition-all ${
              selectedLayout === layout.id ? "ring-2 ring-primary" : ""
            }`}
          >
            <RadioGroupItem
              value={layout.id}
              id={layout.id}
              className="absolute right-4 top-4"
            />
            <div className="mb-4">
              <Icon className="h-8 w-8" />
            </div>
            <Label htmlFor={layout.id} className="font-medium">
              {layout.name}
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              {layout.description}
            </p>
          </Card>
        );
      })}
    </RadioGroup>
  );
};

export default LayoutSelector;