import { Card } from "@/components/ui/card";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import type { ComponentData } from "../ComponentSelector";

interface ComponentCardProps {
  component: ComponentData;
  isSelected: boolean;
}

export const ComponentCard = ({ component, isSelected }: ComponentCardProps) => {
  return (
    <Card
      className={`p-4 cursor-pointer transition-all ${
        isSelected ? "ring-2 ring-primary" : "hover:bg-accent"
      }`}
    >
      <div className="flex items-start gap-4">
        <RadioGroupItem value={component.id} id={component.id} />
        <div className="flex-1">
          <Label htmlFor={component.id} className="text-lg font-semibold">
            {component.name}
          </Label>
          <div className="flex flex-wrap gap-2 mt-1">
            {component.manufacturer && (
              <Badge variant="secondary">
                {component.manufacturer}
              </Badge>
            )}
            {component.cost_usd && (
              <Badge variant="secondary">
                ${component.cost_usd}
              </Badge>
            )}
          </div>
          {component.summary && (
            <p className="mt-2 text-sm text-muted-foreground">
              {component.summary}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};