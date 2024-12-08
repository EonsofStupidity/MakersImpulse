import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Camera, Plus, Trash2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ImageAnnotator } from "../ImageAnnotator";

interface ImageUploadStepProps {
  initialData: any;
  onComplete: (data: any) => void;
}

export const ImageUploadStep = ({ initialData, onComplete }: ImageUploadStepProps) => {
  const [images, setImages] = useState(initialData.images || []);
  const [currentImage, setCurrentImage] = useState<number | null>(null);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split(".").pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from("component_images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("component_images")
        .getPublicUrl(filePath);

      setImages([
        ...images,
        {
          url: publicUrl,
          annotations: {},
          step_number: images.length + 1,
          caption: "",
        },
      ]);

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    }
  };

  const handleAnnotationUpdate = (annotations: any) => {
    if (currentImage === null) return;
    
    const updatedImages = [...images];
    updatedImages[currentImage] = {
      ...updatedImages[currentImage],
      annotations,
    };
    setImages(updatedImages);
  };

  const handleCaptionUpdate = (index: number, caption: string) => {
    const updatedImages = [...images];
    updatedImages[index] = {
      ...updatedImages[index],
      caption,
    };
    setImages(updatedImages);
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    if (currentImage === index) {
      setCurrentImage(null);
    }
  };

  const handleSubmit = () => {
    if (images.length === 0) {
      toast({
        title: "Error",
        description: "Please upload at least one image",
        variant: "destructive",
      });
      return;
    }
    onComplete({ images });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card className="p-4">
            <Label htmlFor="image-upload" className="cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </Label>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <Card
                key={index}
                className={`p-2 relative cursor-pointer ${
                  currentImage === index ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setCurrentImage(index)}
              >
                <img
                  src={image.url}
                  alt={`Build step ${index + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage(index);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Add caption"
                  value={image.caption || ""}
                  onChange={(e) => handleCaptionUpdate(index, e.target.value)}
                  className="mt-2"
                  onClick={(e) => e.stopPropagation()}
                />
              </Card>
            ))}
          </div>
        </div>

        <div>
          {currentImage !== null && (
            <ImageAnnotator
              imageUrl={images[currentImage].url}
              annotations={images[currentImage].annotations}
              onAnnotationsUpdate={handleAnnotationUpdate}
            />
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button onClick={handleSubmit}>
          Next Step
        </Button>
      </div>
    </div>
  );
};
