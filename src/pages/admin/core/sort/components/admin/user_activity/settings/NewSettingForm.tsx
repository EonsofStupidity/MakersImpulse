import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SettingFormData } from "../types";

interface NewSettingFormProps {
  formData: SettingFormData;
  setFormData: (data: SettingFormData) => void;
  onSubmit: () => void;
}

export const NewSettingForm = ({
  formData,
  setFormData,
  onSubmit,
}: NewSettingFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="setting_name">Setting Name</Label>
        <Input
          id="setting_name"
          value={formData.setting_name}
          onChange={(e) =>
            setFormData({ ...formData, setting_name: e.target.value })
          }
          placeholder="e.g., daily_login_points"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="setting_type">Setting Type</Label>
        <Select
          value={formData.setting_type}
          onValueChange={(value: "integer" | "float" | "string") =>
            setFormData({ ...formData, setting_type: value })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="integer">Integer</SelectItem>
            <SelectItem value="float">Float</SelectItem>
            <SelectItem value="string">String</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="setting_value">Value</Label>
        <Input
          id="setting_value"
          value={formData.setting_value}
          onChange={(e) =>
            setFormData({ ...formData, setting_value: e.target.value })
          }
          placeholder="Enter value"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Enter description"
        />
      </div>
      <Button type="submit" className="w-full">
        Create Setting
      </Button>
    </form>
  );
};