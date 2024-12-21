import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ThemeFormData } from "@/types/theme";
import { toast } from "sonner";

export const useThemeInheritance = (
  parentThemeId: string | null, 
  strategy: "merge" | "override" | "replace" = "merge"
) => {
  const { data: parentTheme, isLoading: isParentLoading } = useQuery({
    queryKey: ["parent-theme", parentThemeId],
    queryFn: async () => {
      if (!parentThemeId) return null;
      
      const { data, error } = await supabase
        .from("base_themes")
        .select("*")
        .eq("id", parentThemeId)
        .single();
      
      if (error) {
        console.error("Error fetching parent theme:", error);
        toast.error("Failed to load parent theme");
        throw error;
      }
      
      return data;
    },
    enabled: !!parentThemeId
  });

  const mergeThemes = (childTheme: ThemeFormData, parentTheme: ThemeFormData | null) => {
    if (!parentTheme) return childTheme;

    switch (strategy) {
      case "merge":
        return {
          ...parentTheme,
          ...Object.fromEntries(
            Object.entries(childTheme).filter(([_, value]) => value !== null && value !== undefined)
          )
        };
      case "override":
        return {
          ...parentTheme,
          ...childTheme
        };
      case "replace":
        return childTheme;
      default:
        return childTheme;
    }
  };

  return {
    parentTheme,
    isParentLoading,
    mergeThemes
  };
};