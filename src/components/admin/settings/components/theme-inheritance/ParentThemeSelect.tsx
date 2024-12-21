import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SettingsFormData } from "@/types/theme";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

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
    <div className="space-y-4">
      <Alert className="bg-primary/10 border-primary/20">
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          Select a parent theme to inherit its settings. You can customize how the inheritance works using the strategy below.
        </AlertDescription>
      </Alert>

      <div className="space-y-2">
        <Label htmlFor="parent-theme">Parent Theme</Label>
        <Select
          value={form.watch("parent_theme_id") || ""}
          onValueChange={(value) => {
            form.setValue("parent_theme_id", value);
            // Reset inheritance strategy to merge when changing parent theme
            if (value) {
              form.setValue("inheritance_strategy", "merge");
            }
          }}
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
    </div>
  );
};