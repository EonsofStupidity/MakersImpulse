import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CSSEffectsControlProps } from '@/types';

export const CSSEffectsControl: React.FC<CSSEffectsControlProps> = ({
  label,
  type,
  value,
  onChange,
  min,
  max,
  step,
  options,
  description,
  className
}) => {
  const renderControl = () => {
    switch (type) {
      case 'slider':
        return (
          <Slider
            defaultValue={[value as number]}
            max={max}
            min={min}
            step={step}
            onValueChange={(values) => onChange(values[0])}
          />
        );
      case 'select':
        return (
          <Select value={String(value)} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
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
      default:
        return (
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        );
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      {renderControl()}
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
};