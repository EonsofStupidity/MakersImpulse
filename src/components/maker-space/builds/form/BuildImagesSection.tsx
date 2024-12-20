import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import ImageUploadZone from '@/components/uploads/ImageUploadZone';
import type { BuildFormData } from '@/types/builds';

interface BuildImagesSectionProps {
  form: UseFormReturn<BuildFormData>;
}

const BuildImagesSection: React.FC<BuildImagesSectionProps> = ({ form }) => {
  const [images, setImages] = React.useState<File[]>([]);

  const handleImagesChange = (newImages: File[]) => {
    setImages(newImages);
    form.setValue('images', newImages.map(file => ({
      url: URL.createObjectURL(file),
      alt: file.name,
      caption: '',
    })));
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Images</h2>
      <ImageUploadZone
        images={images}
        onImagesChange={handleImagesChange}
      />
    </Card>
  );
};

export default BuildImagesSection;