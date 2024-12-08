import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface CSSEffectsControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

export const CSSEffectsControl: React.FC<CSSEffectsControlProps> = ({
  label,
  value,
  min,
  max,
  onChange,
}) => {
  console.log(`CSSEffectsControl rendered for ${label} with value: ${value}`);

  return (
    <div className="space-y-2">
      <Label className="text-sm text-gray-300">{label}</Label>
      <div className="flex items-center gap-4">
        <Slider
          value={[value]}
          min={min}
          max={max}
          step={0.1}
          onValueChange={(values) => onChange(values[0])}
          className="flex-1"
        />
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-20 bg-gray-700/50 border-gray-600"
          min={min}
          max={max}
          step={0.1}
        />
      </div>
    </div>
  );
};