import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Save } from "lucide-react";
import type { BuildConfig } from "@/types/build";

interface ReviewStepProps {
  data: BuildConfig;
  onSubmit: () => void;
  isSubmitting?: boolean;
  onBack: () => void;
}

export const ReviewStep = ({ data, onSubmit, isSubmitting, onBack }: ReviewStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Review Configuration</h3>
        <p className="text-sm text-muted-foreground">
          Review your printer configuration before submitting
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <div>
          <h4 className="font-medium mb-2">Basic Information</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-muted-foreground">Kinematics Type:</span>
              <p className="capitalize">{data.kinematic_type}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Build Volume:</span>
              <p>
                {data.build_volume?.x}mm x {data.build_volume?.y}mm x {data.build_volume?.z}mm
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Core Components</h4>
          <div className="space-y-2">
            {data.core_components?.mcu && (
              <div>
                <span className="text-sm text-muted-foreground">MCU:</span>
                <p>{data.core_components.mcu.name}</p>
              </div>
            )}
            {data.core_components?.hotend && (
              <div>
                <span className="text-sm text-muted-foreground">Hotend:</span>
                <p>{data.core_components.hotend.name}</p>
              </div>
            )}
            {data.core_components?.extruder && (
              <div>
                <span className="text-sm text-muted-foreground">Extruder:</span>
                <p>{data.core_components.extruder.name}</p>
              </div>
            )}
          </div>
        </div>

        {data.addons && data.addons.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Add-ons</h4>
            <div className="space-y-1">
              {data.addons.map((addon) => (
                <p key={addon.id}>{addon.name}</p>
              ))}
            </div>
          </div>
        )}
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        <Button 
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {isSubmitting ? "Saving..." : "Save Configuration"}
        </Button>
      </div>
    </div>
  );
};