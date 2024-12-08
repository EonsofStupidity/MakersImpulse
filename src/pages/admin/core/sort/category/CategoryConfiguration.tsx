import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface CategoryConfigurationProps {
  formData: any;
  setFormData: (data: any) => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const CategoryConfiguration = ({
  formData,
  setFormData,
  onBack,
  onSubmit,
}: CategoryConfigurationProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description || ""}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter category description"
          className="min-h-[100px]"
        />
      </div>
      <div>
        <Label htmlFor="icon">Icon</Label>
        <Input
          id="icon"
          value={formData.icon || ""}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          placeholder="Icon name or URL"
        />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="isPublic">Make Public</Label>
        <Switch
          id="isPublic"
          checked={formData.is_public || false}
          onCheckedChange={(checked) => setFormData({ ...formData, is_public: checked })}
        />
      </div>
      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          type="submit"
          className="flex-1"
          onClick={onSubmit}
        >
          Create Category
        </Button>
      </div>
    </div>
  );
};