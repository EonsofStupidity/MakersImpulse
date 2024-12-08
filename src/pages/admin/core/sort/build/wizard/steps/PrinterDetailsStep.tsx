import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BuildConfig } from "@/types/build";

interface PrinterDetailsStepProps {
  data: BuildConfig;
  onNext: () => void;
  onBack: () => void;
  onUpdate: (data: Partial<BuildConfig>) => void;
}

export const PrinterDetailsStep = ({
  data,
  onNext,
  onBack,
  onUpdate,
}: PrinterDetailsStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!data.build_volume?.x || !data.build_volume?.y || !data.build_volume?.z) {
      newErrors.build_volume = "Please enter all build volume dimensions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Printer Details</h3>
        <p className="text-sm text-muted-foreground">
          Enter the physical specifications of your printer
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Build Volume</Label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>X (mm)</Label>
              <Input
                type="number"
                value={data.build_volume?.x || ""}
                onChange={(e) =>
                  onUpdate({
                    build_volume: { ...data.build_volume, x: Number(e.target.value) },
                  })
                }
                placeholder="Width"
              />
            </div>
            <div>
              <Label>Y (mm)</Label>
              <Input
                type="number"
                value={data.build_volume?.y || ""}
                onChange={(e) =>
                  onUpdate({
                    build_volume: { ...data.build_volume, y: Number(e.target.value) },
                  })
                }
                placeholder="Depth"
              />
            </div>
            <div>
              <Label>Z (mm)</Label>
              <Input
                type="number"
                value={data.build_volume?.z || ""}
                onChange={(e) =>
                  onUpdate({
                    build_volume: { ...data.build_volume, z: Number(e.target.value) },
                  })
                }
                placeholder="Height"
              />
            </div>
          </div>
          {errors.build_volume && (
            <p className="mt-1 text-sm text-destructive">{errors.build_volume}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        <Button onClick={handleNext} className="flex items-center gap-2">
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};