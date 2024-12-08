import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AdminSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [newSetting, setNewSetting] = useState({ key: "", value: "" });

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
    mutationFn: async ({ id, value }: { id: string; value: any }) => {
      const { error } = await supabase
        .from("admin_settings")
        .update({ setting_value: value })
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
      toast({
        title: "Setting Updated",
        description: "The setting has been updated successfully.",
      });
    },
  });

  const addSetting = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: any }) => {
      const { error } = await supabase
        .from("admin_settings")
        .insert([{ setting_key: key, setting_value: value }]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
      setNewSetting({ key: "", value: "" });
      toast({
        title: "Setting Added",
        description: "The new setting has been added successfully.",
      });
    },
  });

  const handleAddSetting = () => {
    if (!newSetting.key || !newSetting.value) return;
    try {
      const parsedValue = JSON.parse(newSetting.value);
      addSetting.mutate({ key: newSetting.key, value: parsedValue });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Invalid JSON",
        description: "Please enter valid JSON for the setting value.",
      });
    }
  };

  if (isLoading) return <div>Loading settings...</div>;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Add New Setting</h3>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="setting-key">Setting Key</Label>
            <Input
              id="setting-key"
              value={newSetting.key}
              onChange={(e) => setNewSetting(s => ({ ...s, key: e.target.value }))}
              placeholder="Enter setting key"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="setting-value">Setting Value (JSON)</Label>
            <Input
              id="setting-value"
              value={newSetting.value}
              onChange={(e) => setNewSetting(s => ({ ...s, value: e.target.value }))}
              placeholder='Enter JSON value (e.g., {"enabled": true})'
            />
          </div>
          <Button onClick={handleAddSetting}>Add Setting</Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Current Settings</h3>
        <div className="space-y-4">
          {settings?.map((setting) => (
            <div key={setting.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">{setting.setting_key}</h4>
                <pre className="text-sm text-muted-foreground mt-1">
                  {JSON.stringify(setting.setting_value, null, 2)}
                </pre>
              </div>
              {typeof setting.setting_value === "boolean" && (
                <Switch
                  checked={setting.setting_value}
                  onCheckedChange={(checked) =>
                    updateSetting.mutate({ id: setting.id, value: checked })
                  }
                />
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminSettings;