import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useParentTheme = (parentThemeId: string | null) => {
  const { data: parentTheme, isLoading } = useQuery({
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

  return { parentTheme, isLoading };
};