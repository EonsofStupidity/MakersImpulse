import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { BuildImage } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface BuildImagesSectionProps {
  images: BuildImage[];
  onChange: (images: BuildImage[]) => void;
}

export const BuildImagesSection: React.FC<BuildImagesSectionProps> = ({ images, onChange }) => {
  const { control, handleSubmit } = useForm<{ images: BuildImage[] }>({
    defaultValues: { images }
  });

  const onSubmit = (data: { images: BuildImage[] }) => {
    onChange(data.images);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {images.map((image, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Controller
            name={`images.${index}.url`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Image URL"
                className="flex-1"
              />
            )}
          />
          <Controller
            name={`images.${index}.type`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Image Type"
                className="flex-1"
              />
            )}
          />
          <Controller
            name={`images.${index}.alt`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Alt Text"
                className="flex-1"
              />
            )}
          />
          <Controller
            name={`images.${index}.caption`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Caption"
                className="flex-1"
              />
            )}
          />
        </div>
      ))}
      <Button type="submit">Save Images</Button>
    </form>
  );
};
