import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AdminSettingsForm = () => {
  const { toast } = useToast();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("admin_settings")
        .select("*")
        .order("setting_key");
      
      if (error) throw error;
      return data;
    },
  });

  const updateSetting = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: any }) => {
      const { error } = await supabase
        .from("admin_settings")
        .update({ setting_value: value })
        .eq("setting_key", key);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Settings Updated",
        description: "Your changes have been saved successfully.",
      });
    },
  });

  if (isLoading) return <div>Loading settings...</div>;

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Settings</h2>
      <div className="space-y-4">
        {settings?.map((setting) => (
          <div key={setting.id} className="space-y-2">
            <Label htmlFor={setting.setting_key}>{setting.setting_key}</Label>
            <Input
              id={setting.setting_key}
              value={String(setting.setting_value)}
              onChange={(e) => 
                updateSetting.mutate({
                  key: setting.setting_key,
                  value: e.target.value,
                })
              }
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AdminSettingsForm;