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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

interface ThemeInheritanceSectionProps {
  form: UseFormReturn<SettingsFormData>;
}

export const ThemeInheritanceSection: React.FC<ThemeInheritanceSectionProps> = ({ form }) => {
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

  const parentThemeId = form.watch("parent_theme_id");
  const inheritanceStrategy = form.watch("inheritance_strategy");

  const { data: parentTheme } = useQuery({
    queryKey: ["parent-theme", parentThemeId],
    queryFn: async () => {
      if (!parentThemeId) return null;
      const { data, error } = await supabase
        .from("base_themes")
        .select("*")
        .eq("id", parentThemeId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!parentThemeId
  });

  return (
    <AccordionItem value="theme-inheritance">
      <AccordionTrigger className="text-lg font-semibold text-white">
        Theme Inheritance & Presets
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pt-4">
        <Card className="p-4 space-y-4 bg-gray-800/50 border border-white/10">
          <Alert className="bg-primary/10 border-primary/20">
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              Theme inheritance allows you to build upon existing themes while maintaining the ability to override specific settings.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="parent-theme">Parent Theme</Label>
            <Select
              value={parentThemeId || ""}
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

          {parentThemeId && (
            <div className="space-y-2">
              <Label htmlFor="inheritance-strategy">Inheritance Strategy</Label>
              <Select
                value={inheritanceStrategy || "merge"}
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

              <div className="pt-2 space-y-2">
                <Badge variant="secondary" className="bg-primary/20 text-primary">
                  Inheriting from: {parentTheme?.name}
                </Badge>
                {inheritanceStrategy === "merge" && (
                  <p className="text-sm text-gray-400">
                    Only modified settings will override the parent theme
                  </p>
                )}
                {inheritanceStrategy === "override" && (
                  <p className="text-sm text-gray-400">
                    Your settings take precedence, falling back to parent theme when unset
                  </p>
                )}
                {inheritanceStrategy === "replace" && (
                  <p className="text-sm text-gray-400">
                    Parent theme values are completely ignored
                  </p>
                )}
              </div>
            </div>
          )}
        </Card>
      </AccordionContent>
    </AccordionItem>
  );
};