import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const LoginSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: settings } = useQuery({
    queryKey: ["login-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gamification_settings")
        .select("*")
        .in("setting_name", [
          "daily_login_points",
          "streak_bonus_multiplier",
          "streak_bonus_threshold",
          "inactivity_decay_percentage",
          "inactivity_threshold_days"
        ]);
      
      if (error) throw error;
      return data;
    },
  });

  const updateSetting = useMutation({
    mutationFn: async ({ name, value }: { name: string; value: string }) => {
      const { error } = await supabase
        .from("gamification_settings")
        .update({ setting_value: value })
        .eq("setting_name", name);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login-settings"] });
      toast({
        title: "Settings Updated",
        description: "Login settings have been updated successfully.",
      });
    },
  });

  const getSettingValue = (name: string) => {
    return settings?.find(s => s.setting_name === name)?.setting_value || "";
  };

  return (
    <Card className="p-6 space-y-6">
      <h3 className="text-lg font-semibold">Daily Login Settings</h3>
      
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="daily_points">Base Daily Login Points</Label>
          <Input
            id="daily_points"
            type="number"
            value={getSettingValue("daily_login_points")}
            onChange={(e) => updateSetting.mutate({ 
              name: "daily_login_points", 
              value: e.target.value 
            })}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="streak_multiplier">Streak Bonus Multiplier</Label>
          <Input
            id="streak_multiplier"
            type="number"
            step="0.1"
            value={getSettingValue("streak_bonus_multiplier")}
            onChange={(e) => updateSetting.mutate({ 
              name: "streak_bonus_multiplier", 
              value: e.target.value 
            })}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="streak_threshold">Streak Bonus Threshold (Days)</Label>
          <Input
            id="streak_threshold"
            type="number"
            value={getSettingValue("streak_bonus_threshold")}
            onChange={(e) => updateSetting.mutate({ 
              name: "streak_bonus_threshold", 
              value: e.target.value 
            })}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="decay_percentage">Inactivity Decay Percentage</Label>
          <Input
            id="decay_percentage"
            type="number"
            value={getSettingValue("inactivity_decay_percentage")}
            onChange={(e) => updateSetting.mutate({ 
              name: "inactivity_decay_percentage", 
              value: e.target.value 
            })}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="decay_days">Inactivity Threshold (Days)</Label>
          <Input
            id="decay_days"
            type="number"
            value={getSettingValue("inactivity_threshold_days")}
            onChange={(e) => updateSetting.mutate({ 
              name: "inactivity_threshold_days", 
              value: e.target.value 
            })}
          />
        </div>
      </div>
    </Card>
  );
};