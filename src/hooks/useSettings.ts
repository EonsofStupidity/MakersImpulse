import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { UnifiedSetting, SettingType } from "@/types/settings";
import { toast } from "sonner";

export const useSettings = (category: SettingType, key: string) => {
  const queryClient = useQueryClient();

  const { data: setting, isLoading } = useQuery({
    queryKey: ["settings", category, key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("unified_settings")
        .select("*")
        .eq("category", category)
        .eq("key", key)
        .single();

      if (error) throw error;
      return data as UnifiedSetting;
    }
  });

  const updateSetting = useMutation({
    mutationFn: async (value: any) => {
      const { error } = await supabase
        .from("unified_settings")
        .upsert({
          category,
          key,
          value,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings", category, key] });
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