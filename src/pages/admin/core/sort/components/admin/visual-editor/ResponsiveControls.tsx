import { Button } from "@/components/ui/button";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface ResponsiveControlsProps {
  selectedBreakpoint: "desktop" | "tablet" | "mobile";
  onBreakpointChange: (breakpoint: "desktop" | "tablet" | "mobile") => void;
  gridSettings: {
    columns: number;
    showGrid: boolean;
    snapToGrid: boolean;
  };
  onGridSettingsChange: (settings: {
    columns: number;
    showGrid: boolean;
    snapToGrid: boolean;
  }) => void;
}

export const ResponsiveControls = ({
  selectedBreakpoint,
  onBreakpointChange,
  gridSettings,
  onGridSettingsChange,
}: ResponsiveControlsProps) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-background">
      <div className="flex items-center gap-4">
        <Button
          variant={selectedBreakpoint === "desktop" ? "default" : "outline"}
          size="sm"
          onClick={() => onBreakpointChange("desktop")}
        >
          <Monitor className="h-4 w-4 mr-2" />
          Desktop
        </Button>
        <Button
          variant={selectedBreakpoint === "tablet" ? "default" : "outline"}
          size="sm"
          onClick={() => onBreakpointChange("tablet")}
        >
          <Tablet className="h-4 w-4 mr-2" />
          Tablet
        </Button>
        <Button
          variant={selectedBreakpoint === "mobile" ? "default" : "outline"}
          size="sm"
          onClick={() => onBreakpointChange("mobile")}
        >
          <Smartphone className="h-4 w-4 mr-2" />
          Mobile
        </Button>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Switch
            id="show-grid"
            checked={gridSettings.showGrid}
            onCheckedChange={(checked) =>
              onGridSettingsChange({ ...gridSettings, showGrid: checked })
            }
          />
          <Label htmlFor="show-grid">Show Grid</Label>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            id="snap-grid"
            checked={gridSettings.snapToGrid}
            onCheckedChange={(checked) =>
              onGridSettingsChange({ ...gridSettings, snapToGrid: checked })
            }
          />
          <Label htmlFor="snap-grid">Snap to Grid</Label>
        </div>

        <div className="flex items-center gap-2">
          <Label>Columns: {gridSettings.columns}</Label>
          <Slider
            min={1}
            max={12}
            step={1}
            value={[gridSettings.columns]}
            onValueChange={([value]) =>
              onGridSettingsChange({ ...gridSettings, columns: value })
            }
            className="w-[100px]"
          />
        </div>
      </div>
    </div>
  );
};