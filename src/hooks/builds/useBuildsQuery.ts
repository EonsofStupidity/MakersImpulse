import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Build, BuildQueryParams } from "@/types/builds";

export const useBuildsQuery = (params?: BuildQueryParams) => {
  return useQuery({
    queryKey: ['builds', params],
    queryFn: async () => {
      let query = supabase
        .from('mi3dp_builds')
        .select('*');

      if (params?.sort) {
        query = query.order(params.sort, { 
          ascending: params.order === 'asc' 
        });
      }

      if (params?.user_id) {
        query = query.eq('user_id', params.user_id);
      }

      const { data, error } = await query;
      
      if (error) throw error;

      // Convert database JSON to typed interfaces
      return (data as any[]).map(build => ({
        ...build,
        build_volume: build.build_volume as BuildVolume,
        parts: build.parts as BuildPart[],
        images: build.images as BuildImage[]
      })) as Build[];
    }
  });
};