import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface CSSEffectsControlProps {
  label: string;
  type: "slider" | "select" | "input";
  value: number | string;
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: any) => void;
  className?: string;
  previewClass?: string;
  description?: string;
}

export const CSSEffectsControl: React.FC<CSSEffectsControlProps> = ({
  label,
  type,
  value,
  options,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  className,
  previewClass,
  description
}) => {
  const renderControl = () => {
    switch (type) {
      case "slider":
        return (
          <div className="flex items-center gap-4">
            <Slider
              value={[typeof value === 'number' ? value : 0]}
              min={min}
              max={max}
              step={step}
              onValueChange={(values) => onChange(values[0])}
              className="flex-1"
            />
            <Input
              type="number"
              value={value}
              onChange={(e) => onChange(Number(e.target.value))}
              className="w-20 bg-gray-100"
              min={min}
              max={max}
              step={step}
            />
          </div>
        );
      case "select":
        return (
          <Select value={value.toString()} onValueChange={onChange}>
            <SelectTrigger className="w-full bg-gray-100">
              <SelectValue placeholder="Select animation" />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "input":
        return (
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-gray-100"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        <Label className="text-sm text-gray-300">{label}</Label>
        {previewClass && (
          <div className={cn("text-sm px-2 py-1", previewClass)}>Preview</div>
        )}
      </div>
      {description && (
        <p className="text-xs text-gray-400">{description}</p>
      )}
      {renderControl()}
    </div>
  );
};