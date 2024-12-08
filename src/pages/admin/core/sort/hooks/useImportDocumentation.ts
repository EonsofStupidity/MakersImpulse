import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { ImportDocumentation } from "@/components/admin/components/csv/types";

export const useImportDocumentation = () => {
  return useQuery({
    queryKey: ['import-documentation'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('import_documentation')
        .select('*')
        .order('order_index');
      
      if (error) throw error;
      return data as ImportDocumentation[];
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};