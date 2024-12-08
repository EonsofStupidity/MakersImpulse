import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  label: string;
  value: string;
  cssVar?: string;
  onChange: (color: string) => void;
  className?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ 
  label, 
  value, 
  cssVar,
  onChange,
  className 
}) => {
  console.log(`ColorPicker rendered for ${label} with value: ${value}, cssVar: ${cssVar}`);
  
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="flex-1">
        <Label className="text-sm text-gray-300">
          {label}
          {cssVar && <span className="ml-2 text-xs text-gray-400">({cssVar})</span>}
        </Label>
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 bg-gray-700/50 border-gray-600"
        />
      </div>
      <Input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-12 h-12 p-1 rounded-lg cursor-pointer bg-gray-700/50 border-gray-600"
      />
    </div>
  );
};