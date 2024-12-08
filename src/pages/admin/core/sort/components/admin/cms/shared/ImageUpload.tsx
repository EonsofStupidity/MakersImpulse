import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button";
import { handleImageUpload } from '../ImageUploadHandler';
import { useToast } from '@/components/ui/use-toast';

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void;
  onUploadError: () => void;
  uploadType?: 'blog' | 'data_maestro';
}

export const ImageUpload = ({ onUploadSuccess, onUploadError, uploadType = 'blog' }: ImageUploadProps) => {
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleImageUpload(
        acceptedFiles[0],
        toast,
        onUploadSuccess,
        onUploadError,
        uploadType
      );
    }
  }, [onUploadSuccess, onUploadError, toast, uploadType]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here...</p>
      ) : (
        <div className="space-y-4">
          <p>Drag & drop an image here, or click to select one</p>
          <Button type="button" variant="outline">
            Select Image
          </Button>
        </div>
      )}
    </div>
  );
};