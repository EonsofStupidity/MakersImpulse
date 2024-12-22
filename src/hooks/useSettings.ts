import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { UnifiedSetting, SettingType } from "@/types/settings";
import { toast } from "sonner";
import { Json } from "@/types/core/json";

export const useSettings = <T extends Json>(category: SettingType, key: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["settings", category, key];

  const { data: setting, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("unified_settings")
        .select("*")
        .eq("category", category)
        .eq("key", key)
        .single();

      if (error) throw error;
      return data as UnifiedSetting<T>;
    }
  });

  const updateSetting = useMutation({
    mutationFn: async (value: T) => {
      const { error } = await supabase
        .from("unified_settings")
        .upsert({
          category,
          key,
          value: value as Json,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success("Settings updated successfully");
    },
    onError: (error) => {
      console.error("Error updating settings:", error);
      toast.error("Failed to update settings");
    }
  });

  return {
    setting,
    isLoading,
    updateSetting: updateSetting.mutate,
    isUpdating: updateSetting.isPending
  };
};