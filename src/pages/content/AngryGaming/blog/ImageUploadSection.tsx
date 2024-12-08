import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImagePlus, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { handleImageUpload } from "@/components/admin/cms/ImageUploadHandler";

interface ImageUploadSectionProps {
  onImageUploaded: (url: string) => void;
}

export const ImageUploadSection = ({ onImageUploaded }: ImageUploadSectionProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setIsUploading(true);
      handleImageUpload(
        acceptedFiles[0],
        toast,
        (url) => {
          onImageUploaded(url);
          setIsUploading(false);
        },
        () => setIsUploading(false)
      );
    }
  }, [onImageUploaded, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    multiple: false,
    disabled: isUploading
  });

  const handleButtonUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        setIsUploading(true);
        handleImageUpload(
          target.files[0],
          toast,
          (url) => {
            onImageUploaded(url);
            setIsUploading(false);
          },
          () => setIsUploading(false)
        );
      }
    };
    input.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Featured Image</h3>
        <Button 
          onClick={handleButtonUpload}
          disabled={isUploading}
          variant="outline"
        >
          <ImagePlus className="h-4 w-4 mr-2" />
          Upload Image
        </Button>
      </div>

      <Card
        {...getRootProps()}
        className={`p-8 border-2 border-dashed cursor-pointer transition-colors ${
          isDragActive ? 'border-primary bg-primary/5' : 'border-muted'
        } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <Upload className="h-12 w-12 text-muted-foreground" />
          <div className="space-y-2">
            <p className="text-sm font-medium">
              {isDragActive ? 'Drop the image here' : 'Drag & drop an image here'}
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, GIF up to 5MB
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};