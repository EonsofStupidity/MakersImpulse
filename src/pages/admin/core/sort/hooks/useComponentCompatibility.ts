import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { ComponentData } from "@/types/build";

export const useComponentCompatibility = (componentId?: string) => {
  const { data: compatibleComponents, isLoading } = useQuery({
    queryKey: ['component-compatibility', componentId],
    queryFn: async () => {
      if (!componentId) return [];
      
      const { data, error } = await supabase
        .from('component_compatibility')
        .select(`
          compatible_with_id,
          compatibility_type,
          notes
        `)
        .eq('component_id', componentId);

      if (error) throw error;
      return data;
    },
    enabled: !!componentId
  });

  const checkCompatibility = async (componentA: string, componentB: string) => {
    const { data, error } = await supabase
      .rpc('check_components_compatibility', {
        component_id: componentA,
        other_component_id: componentB
      });

    if (error) throw error;
    return data;
  };

  return {
    compatibleComponents,
    isLoading,
    checkCompatibility
  };
};