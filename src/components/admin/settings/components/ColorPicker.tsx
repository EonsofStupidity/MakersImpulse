import React from "react";
import { Input } from "@/components/ui/input";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <label className="text-sm text-gray-300">{label}</label>
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1"
        />
      </div>
      <Input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-12 h-12 p-1 rounded-lg cursor-pointer"
      />
    </div>
  );
};