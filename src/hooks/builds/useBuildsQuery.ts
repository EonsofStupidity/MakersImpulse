import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Build, BuildQueryParams } from "@/types";

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

      if (params?.userId) {
        query = query.eq('user_id', params.userId);
      }

      const { data, error } = await query;
      
      if (error) throw error;

      return data as Build[];
    }
  });
};