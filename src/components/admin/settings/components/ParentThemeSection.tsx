import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { UseFormReturn } from "react-hook-form";
import { SettingsFormData } from "@/types/theme";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ParentThemeSectionProps {
  form: UseFormReturn<SettingsFormData>;
}

export const ParentThemeSection: React.FC<ParentThemeSectionProps> = ({ form }) => {
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
    <AccordionItem value="parent-theme">
      <AccordionTrigger className="text-lg font-semibold text-white">
        Parent Theme & Inheritance
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pt-4">
        <Card className="p-4 space-y-4 bg-gray-800/50 border border-white/10">
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
                <SelectItem value="merge">Merge (Override only specified values)</SelectItem>
                <SelectItem value="override">Override (Keep parent as fallback)</SelectItem>
                <SelectItem value="replace">Replace (Ignore parent values)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {form.watch("parent_theme_id") && (
            <div className="pt-2">
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                Inheriting from parent theme
              </Badge>
            </div>
          )}
        </Card>
      </AccordionContent>
    </AccordionItem>
  );
};