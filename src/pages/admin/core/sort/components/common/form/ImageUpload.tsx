import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImagePlus, Loader2, Upload, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { handleImageUpload } from '@/components/admin/cms/ImageUploadHandler';

export interface ImageUploadProps {
  value: string | string[] | null;
  onChange: (value: string | string[] | null) => void;
  multiple?: boolean;
  allowPlaceholders?: boolean;
  showThumbnails?: boolean;
  type?: string;
  label?: string;
}

const PLACEHOLDER_IMAGES = [
  "photo-1488590528505-98d2b5aba04b",
  "photo-1518770660439-4636190af475",
  "photo-1461749280684-dccba630e2f6",
  "photo-1486312338219-ce68d2c6f44d",
].map(id => `https://images.unsplash.com/${id}`);

export const ImageUpload = ({ 
  value, 
  onChange, 
  multiple = false, 
  allowPlaceholders = false,
  showThumbnails = false,
  type = 'blog',
  label = 'Image'
}: ImageUploadProps) => {
  const [isUploading, setIsUploading] = React.useState(false);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    try {
      if (multiple) {
        const uploadPromises = files.map(file => 
          new Promise<string>((resolve, reject) => {
            handleImageUpload(
              file,
              toast,
              (url) => resolve(url),
              () => reject(new Error('Upload failed'))
            );
          })
        );
        const urls = await Promise.all(uploadPromises);
        onChange(urls);
      } else {
        handleImageUpload(
          files[0],
          toast,
          (url) => onChange(url),
          () => toast({
            title: "Upload failed",
            description: "Failed to upload image. Please try again.",
            variant: "destructive",
          })
        );
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (imageUrl: string) => {
    if (multiple && Array.isArray(value)) {
      onChange(value.filter(url => url !== imageUrl));
    } else {
      onChange(null);
    }
  };

  const renderThumbnails = () => {
    if (!showThumbnails || !value) return null;

    const images = Array.isArray(value) ? value : [value];

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {images.map((image, index) => (
          image && (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemoveImage(image)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        {label && <Label>{label}</Label>}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="flex cursor-pointer flex-col items-center rounded-lg border border-dashed p-4 hover:bg-muted/50">
              {isUploading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span>Uploading...</span>
                </div>
              ) : (
                <>
                  <ImagePlus className="mb-2 h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {multiple ? 'Upload Images' : 'Upload Image'}
                  </span>
                </>
              )}
              <Input
                type="file"
                accept="image/*"
                className="hidden"
                multiple={multiple}
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </label>
          </div>

          {allowPlaceholders && (
            <Button
              variant="outline"
              onClick={() => {
                const randomPlaceholder = PLACEHOLDER_IMAGES[Math.floor(Math.random() * PLACEHOLDER_IMAGES.length)];
                onChange(randomPlaceholder);
              }}
            >
              Use Placeholder
            </Button>
          )}
        </div>
      </div>

      {renderThumbnails()}
    </div>
  );
};