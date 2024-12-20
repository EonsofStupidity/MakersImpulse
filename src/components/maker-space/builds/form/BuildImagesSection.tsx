import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import ImageUploadZone from '@/components/uploads/ImageUploadZone';
import { supabase } from '@/integrations/supabase/client';
import type { BuildFormData, BuildImage } from '@/types/builds';
import { toast } from 'sonner';

interface BuildImagesSectionProps {
  form: UseFormReturn<BuildFormData>;
}

const BuildImagesSection: React.FC<BuildImagesSectionProps> = ({ form }) => {
  const [images, setImages] = React.useState<File[]>([]);
  const [isUploading, setIsUploading] = React.useState(false);

  const handleImagesChange = async (newImages: File[]) => {
    setImages(newImages);
    setIsUploading(true);

    try {
      const uploadedImages: BuildImage[] = await Promise.all(
        newImages.map(async (file) => {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
          const filePath = `builds/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('media')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data } = supabase.storage
            .from('media')
            .getPublicUrl(filePath);

          return {
            url: data.publicUrl,
            alt: file.name,
            caption: '',
          };
        })
      );

      form.setValue('images', uploadedImages);
      toast.success('Images uploaded successfully');
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Images</h2>
      <ImageUploadZone
        images={images}
        onImagesChange={handleImagesChange}
        isUploading={isUploading}
      />
    </Card>
  );
};

export default BuildImagesSection;