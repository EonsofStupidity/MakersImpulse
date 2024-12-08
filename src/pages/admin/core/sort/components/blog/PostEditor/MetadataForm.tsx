import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/common/form/ImageUpload";

interface MetadataFormProps {
  data: any;
  onChange: (data: any) => void;
}

export const MetadataForm = ({ data, onChange }: MetadataFormProps) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="meta-description">Meta Description</Label>
        <Textarea
          id="meta-description"
          value={data.meta_description || ""}
          onChange={(e) => handleChange("meta_description", e.target.value)}
          placeholder="SEO description for the post"
        />
      </div>

      <div className="space-y-2">
        <Label>Featured Image</Label>
        <ImageUpload
          value={data.featured_image}
          onChange={(value) => handleChange("featured_image", value)}
          allowPlaceholders
        />
      </div>
    </div>
  );
};
