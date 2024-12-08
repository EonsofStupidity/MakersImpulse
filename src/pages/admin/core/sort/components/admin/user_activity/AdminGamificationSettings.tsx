import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { LoginSettings } from "./settings/LoginSettings";
import { SettingsList } from "./settings/SettingsList";
import { NewSettingForm } from "./settings/NewSettingForm";
import type { GamificationSetting, SettingFormData } from "./types";

export const AdminGamificationSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isNewSettingOpen, setIsNewSettingOpen] = useState(false);
  const [editingSetting, setEditingSetting] = useState<GamificationSetting | null>(null);
  const [formData, setFormData] = useState<SettingFormData>({
    setting_name: "",
    setting_value: "",
    setting_type: "string",
    description: "",
  });

  const createSetting = useMutation({
    mutationFn: async (data: SettingFormData) => {
      const { error } = await supabase
        .from("gamification_settings")
        .insert([data]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gamification-settings"] });
      setIsNewSettingOpen(false);
      setFormData({
        setting_name: "",
        setting_value: "",
        setting_type: "string",
        description: "",
      });
      toast({
        title: "Setting Created",
        description: "New gamification setting has been created successfully.",
      });
    },
  });

  const updateSetting = useMutation({
    mutationFn: async (data: GamificationSetting) => {
      const { error } = await supabase
        .from("gamification_settings")
        .update({
          setting_value: data.setting_value,
          description: data.description,
        })
        .eq("id", data.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gamification-settings"] });
      setEditingSetting(null);
      toast({
        title: "Setting Updated",
        description: "Gamification setting has been updated successfully.",
      });
    },
  });

  const deleteSetting = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("gamification_settings")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gamification-settings"] });
      toast({
        title: "Setting Deleted",
        description: "Gamification setting has been deleted successfully.",
      });
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gamification Settings</h2>
        <Dialog open={isNewSettingOpen} onOpenChange={setIsNewSettingOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Setting
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Gamification Setting</DialogTitle>
            </DialogHeader>
            <NewSettingForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={() => createSetting.mutate(formData)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <LoginSettings />

      <Card className="p-6">
        <SettingsList
          onEdit={setEditingSetting}
          onDelete={(id) => deleteSetting.mutate(id)}
          editingSetting={editingSetting}
          formData={formData}
          setFormData={setFormData}
        />
      </Card>
    </div>
  );
};