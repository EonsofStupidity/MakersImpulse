import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const CoreSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["core-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("core_settings")
        .select("*")
        .order("category", { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  const updateSetting = useMutation({
    mutationFn: async ({ id, value }: { id: string; value: any }) => {
      const { error } = await supabase
        .from("core_settings")
        .update({ value })
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["core-settings"] });
      toast({
        title: "Settings Updated",
        description: "The settings have been updated successfully."
      });
    }
  });

  if (isLoading) {
    return <div>Loading settings...</div>;
  }

  const groupedSettings = settings?.reduce((acc: any, setting) => {
    if (!acc[setting.category]) {
      acc[setting.category] = [];
    }
    acc[setting.category].push(setting);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Core Settings</h2>
        <p className="text-muted-foreground">Configure system-wide settings</p>
      </div>

      {Object.entries(groupedSettings || {}).map(([category, categorySettings]: [string, any]) => (
        <Card key={category} className="p-6">
          <h3 className="text-lg font-semibold mb-4 capitalize">{category}</h3>
          <div className="space-y-4">
            {categorySettings.map((setting: any) => (
              <div key={setting.id} className="space-y-2">
                <Label htmlFor={setting.key}>
                  {setting.description || setting.key}
                </Label>
                <Input
                  id={setting.key}
                  value={JSON.stringify(setting.value)}
                  onChange={(e) => {
                    try {
                      const value = JSON.parse(e.target.value);
                      updateSetting.mutate({ id: setting.id, value });
                    } catch (error) {
                      toast({
                        title: "Invalid JSON",
                        description: "Please enter valid JSON for the setting value.",
                        variant: "destructive"
                      });
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CoreSettings;