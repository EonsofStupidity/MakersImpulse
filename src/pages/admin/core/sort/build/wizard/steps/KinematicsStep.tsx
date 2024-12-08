import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronRight } from "lucide-react";
import type { BuildConfig } from "@/types/build";

interface KinematicsStepProps {
  data: BuildConfig;
  onNext: () => void;
  onUpdate: (data: Partial<BuildConfig>) => void;
}

export const KinematicsStep = ({ data, onNext, onUpdate }: KinematicsStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Select Kinematics Type</h3>
        <p className="text-sm text-muted-foreground">
          Choose the motion system type for your 3D printer
        </p>
      </div>

      <RadioGroup
        value={data.kinematic_type}
        onValueChange={(value) => 
          onUpdate({ kinematic_type: value as BuildConfig["kinematic_type"] })
        }
        className="grid gap-4"
      >
        <Card className="relative flex items-center space-x-4 p-4 cursor-pointer hover:bg-accent">
          <RadioGroupItem value="cartesian" id="cartesian" />
          <Label htmlFor="cartesian" className="flex-1 cursor-pointer">
            <div className="font-semibold">Cartesian</div>
            <div className="text-sm text-muted-foreground">
              Traditional XYZ movement system with independent axes
            </div>
          </Label>
        </Card>

        <Card className="relative flex items-center space-x-4 p-4 cursor-pointer hover:bg-accent">
          <RadioGroupItem value="corexy" id="corexy" />
          <Label htmlFor="corexy" className="flex-1 cursor-pointer">
            <div className="font-semibold">CoreXY</div>
            <div className="text-sm text-muted-foreground">
              Belt-driven system with synchronized X/Y movement
            </div>
          </Label>
        </Card>

        <Card className="relative flex items-center space-x-4 p-4 cursor-pointer hover:bg-accent">
          <RadioGroupItem value="delta" id="delta" />
          <Label htmlFor="delta" className="flex-1 cursor-pointer">
            <div className="font-semibold">Delta</div>
            <div className="text-sm text-muted-foreground">
              Parallel arms system for fast, precise movements
            </div>
          </Label>
        </Card>
      </RadioGroup>

      <div className="flex justify-end">
        <Button 
          onClick={onNext}
          disabled={!data.kinematic_type}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};