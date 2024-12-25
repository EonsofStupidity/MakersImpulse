import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ThemeBase } from "@/types";
import { toast } from "sonner";

export const useThemeInheritance = (parentThemeId: string | null) => {
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

  const mergeThemes = (childTheme: ThemeBase, parentTheme: ThemeBase | null) => {
    if (!parentTheme) return childTheme;

    return {
      ...parentTheme,
      ...childTheme,
    };
  };

  return {
    parentTheme,
    isParentLoading,
    mergeThemes
  };
};
