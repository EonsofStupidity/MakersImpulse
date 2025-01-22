import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

import { Profile } from '@/types/core/auth';

export const useProfiles = () => {
  return useQuery({
    queryKey: ['admin-profiles'],
    queryFn: async (): Promise<Profile[]> => {
      console.log('Fetching profiles...');
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching profiles:', error);
        toast.error('Failed to load profiles');
        throw error;
      }

      console.log('Profiles fetched:', data);
      return data;
    },
  });
};
