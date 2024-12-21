import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SettingsFormData } from "@/types/theme";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";

interface ParentThemeSelectProps {
  form: UseFormReturn<SettingsFormData>;
}

export const ParentThemeSelect: React.FC<ParentThemeSelectProps> = ({ form }) => {
  const { data: baseThemes, isLoading } = useQuery({
    queryKey: ["base-themes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("base_themes")
        .select("*")
        .eq("is_active", true);
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="space-y-2">
      <Label htmlFor="parent-theme">Parent Theme</Label>
      <Select
        value={form.watch("parent_theme_id") || ""}
        onValueChange={(value) => form.setValue("parent_theme_id", value)}
      >
        <SelectTrigger id="parent-theme" className="bg-gray-700/50 border-gray-600">
          <SelectValue placeholder="Select a parent theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">None (Standalone Theme)</SelectItem>
          {baseThemes?.map((theme) => (
            <SelectItem key={theme.id} value={theme.id}>
              {theme.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};