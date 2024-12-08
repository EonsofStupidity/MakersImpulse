import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

interface GridSettingsProps {
  gridEnabled: boolean;
  setGridEnabled: (enabled: boolean) => void;
  snapToGrid: boolean;
  setSnapToGrid: (enabled: boolean) => void;
  gridColumns: number;
  setGridColumns: (columns: number) => void;
}

export const GridSettings = ({
  gridEnabled,
  setGridEnabled,
  snapToGrid,
  setSnapToGrid,
  gridColumns,
  setGridColumns,
}: GridSettingsProps) => {
  return (
    <div className="flex items-center space-x-6 px-2">
      <div className="flex items-center space-x-2">
        <Label htmlFor="grid-enabled">Grid</Label>
        <Switch
          id="grid-enabled"
          checked={gridEnabled}
          onCheckedChange={setGridEnabled}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Label htmlFor="snap-grid">Snap to Grid</Label>
        <Switch
          id="snap-grid"
          checked={snapToGrid}
          onCheckedChange={setSnapToGrid}
        />
      </div>

      <div className="flex items-center space-x-4 flex-1">
        <Label htmlFor="grid-columns" className="min-w-20">
          Columns: {gridColumns}
        </Label>
        <Slider
          id="grid-columns"
          min={1}
          max={12}
          step={1}
          value={[gridColumns]}
          onValueChange={(value) => setGridColumns(value[0])}
          className="w-[200px]"
        />
      </div>
    </div>
  );
};