import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import type { ApiCredential } from "@/types/api";

export const useApiKeys = () => {
  const session = useSession();
  const queryClient = useQueryClient();

  const { data: apiKeys, isLoading } = useQuery({
    queryKey: ["api-keys"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("api_credentials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const createKey = useMutation({
    mutationFn: async (params: { name: string; access_level: ApiCredential["access_level"] }) => {
      const { data: keyData, error: keyError } = await supabase.rpc('generate_api_key');
      if (keyError) throw keyError;

      const { data, error } = await supabase
        .from('api_credentials')
        .insert({
          name: params.name,
          api_key: keyData,
          api_secret: crypto.randomUUID(), // Generate a secret
          access_level: params.access_level,
          user_id: session?.user.id,
          enabled: true,
          metadata: {
            created_via: 'web_interface',
            user_agent: navigator.userAgent
          }
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
    },
  });

  const toggleKey = useMutation({
    mutationFn: async ({ id, enabled }: { id: string; enabled: boolean }) => {
      const { error } = await supabase
        .from("api_credentials")
        .update({ enabled })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
    },
  });

  const deleteKey = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("api_credentials")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
    },
  });

  return {
    apiKeys,
    isLoading,
    createKey,
    toggleKey,
    deleteKey
  };
};