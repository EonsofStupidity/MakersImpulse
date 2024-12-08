import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleColorChange = (newColor: string) => {
    onChange(newColor);
    // Update CSS variable in real-time
    if (cssVar) {
      document.documentElement.style.setProperty(cssVar, newColor);
    }
    // Show visual feedback
    toast.success(`${label} updated to ${newColor}`, {
      description: `CSS Variable: ${cssVar || 'none'}`,
    });
  };

  const handleColorPickerClick = () => {
    colorInputRef.current?.click();
  };
  
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <Label className="text-sm text-gray-300">
          {label}
          {cssVar && (
            <span className="ml-2 text-xs text-gray-400">
              ({cssVar})
            </span>
          )}
        </Label>
        <span className="text-xs font-mono text-gray-400">
          {value}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            type="text"
            value={value}
            onChange={(e) => handleColorChange(e.target.value)}
            className="mt-1 bg-gray-700/50 border-gray-600 font-mono"
          />
        </div>
        <div className="relative group">
          <div
            onClick={handleColorPickerClick}
            className="w-12 h-12 rounded-lg cursor-pointer transition-all hover:scale-110 border border-gray-600"
            style={{ backgroundColor: value }}
          />
          <Input
            ref={colorInputRef}
            type="color"
            value={value}
            onChange={(e) => handleColorChange(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Click to pick color
          </div>
        </div>
      </div>
      <div 
        className="h-6 w-full rounded transition-all"
        style={{ 
          background: value,
          boxShadow: `0 0 10px ${value}` 
        }}
      />
    </div>
  );
};