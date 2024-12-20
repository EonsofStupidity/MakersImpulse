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

      if (params?.sortBy) {
        query = query.order(params.sortBy, { 
          ascending: params.sortOrder === 'asc' 
        });
      }

      if (params?.userId) {
        query = query.eq('user_id', params.userId);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data as Build[];
    }
  });
};