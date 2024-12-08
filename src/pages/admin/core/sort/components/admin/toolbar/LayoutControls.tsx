import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Rows, Columns, Compass } from "lucide-react";

export type LayoutType = 'horizontal' | 'vertical' | 'floating';

interface LayoutControlsProps {
  layout: LayoutType;
  onLayoutChange: (value: LayoutType) => void;
  className?: string;
}

export const LayoutControls = ({ layout, onLayoutChange, className }: LayoutControlsProps) => {
  return (
    <div className={className}>
      <ToggleGroup type="single" value={layout} onValueChange={(value) => onLayoutChange(value as LayoutType)}>
        <ToggleGroupItem value="horizontal" aria-label="Horizontal Layout" className="flex-1">
          <Rows className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="vertical" aria-label="Vertical Layout" className="flex-1">
          <Columns className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="floating" aria-label="Floating Layout" className="flex-1">
          <Compass className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};