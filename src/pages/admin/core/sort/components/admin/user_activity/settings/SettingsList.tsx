import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { GamificationSetting } from "../types";

interface SettingsListProps {
  onEdit: (setting: GamificationSetting) => void;
  onDelete: (id: string) => void;
  editingSetting: GamificationSetting | null;
  formData: any;
  setFormData: (data: any) => void;
}

export const SettingsList = ({
  onEdit,
  onDelete,
  editingSetting,
  formData,
  setFormData,
}: SettingsListProps) => {
  const { data: settings } = useQuery({
    queryKey: ["gamification-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gamification_settings")
        .select("*")
        .order("setting_name");
      
      if (error) throw error;
      return data as GamificationSetting[];
    },
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Setting Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {settings?.map((setting) => (
          <TableRow key={setting.id}>
            <TableCell className="font-medium">
              {setting.setting_name}
            </TableCell>
            <TableCell>{setting.setting_type}</TableCell>
            <TableCell>
              {editingSetting?.id === setting.id ? (
                <Input
                  value={formData.setting_value}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      setting_value: e.target.value,
                    })
                  }
                  className="w-32"
                />
              ) : (
                setting.setting_value
              )}
            </TableCell>
            <TableCell>{setting.description}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(setting)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(setting.id)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};