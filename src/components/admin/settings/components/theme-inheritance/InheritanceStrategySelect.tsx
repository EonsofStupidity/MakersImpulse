import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SettingsFormData } from "@/types/theme";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface InheritanceStrategySelectProps {
  form: UseFormReturn<SettingsFormData>;
}

export const InheritanceStrategySelect: React.FC<InheritanceStrategySelectProps> = ({ form }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="inheritance-strategy">Inheritance Strategy</Label>
      <Select
        value={form.watch("inheritance_strategy") || "merge"}
        onValueChange={(value) => form.setValue("inheritance_strategy", value as "merge" | "override" | "replace")}
      >
        <SelectTrigger id="inheritance-strategy" className="bg-gray-700/50 border-gray-600">
          <SelectValue placeholder="Select inheritance strategy" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="merge">
            Merge (Override only specified values)
          </SelectItem>
          <SelectItem value="override">
            Override (Keep parent as fallback)
          </SelectItem>
          <SelectItem value="replace">
            Replace (Ignore parent values)
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};