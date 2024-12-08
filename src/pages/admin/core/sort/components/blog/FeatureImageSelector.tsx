import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/common/form/ImageUpload";
import { Image as ImageIcon, ImageOff } from "lucide-react";
import type { ComponentType } from "@/types/components";

const PLACEHOLDER_IMAGES = [
  "photo-1488590528505-98d2b5aba04b",
  "photo-1518770660439-4636190af475",
  "photo-1461749280684-dccba630e2f6",
  "photo-1486312338219-ce68d2c6f44d",
].map(id => `https://images.unsplash.com/${id}`);

interface FeatureImageSelectorProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export const FeatureImageSelector = ({
  value,
  onChange
}: FeatureImageSelectorProps) => {
  const [noImage, setNoImage] = useState(false);

  const handleNoImageChange = (checked: boolean) => {
    setNoImage(checked);
    if (checked) {
      onChange(null);
    }
  };

  const handlePlaceholderSelect = (imageUrl: string) => {
    setNoImage(false);
    onChange(imageUrl);
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-lg font-semibold">Feature Image</Label>
        <div className="flex items-center space-x-2">
          <Label htmlFor="no-image">No Image</Label>
          <Switch
            id="no-image"
            checked={noImage}
            onCheckedChange={handleNoImageChange}
          />
        </div>
      </div>

      {!noImage && (
        <>
          <Select
            value={value || ""}
            onValueChange={handlePlaceholderSelect}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a placeholder image" />
            </SelectTrigger>
            <SelectContent>
              {PLACEHOLDER_IMAGES.map((url, index) => (
                <SelectItem key={url} value={url}>
                  Placeholder Image {index + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="space-y-4">
            <Label>Or upload your own:</Label>
            <ImageUpload
              type="blog"
              value={value}
              onChange={onChange}
              allowPlaceholders
            />
          </div>

          {value && (
            <div className="relative mt-4">
              <img
                src={value}
                alt="Feature"
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => onChange(null)}
              >
                <ImageOff className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </Card>
  );
};