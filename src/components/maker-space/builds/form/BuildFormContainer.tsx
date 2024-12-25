import React from 'react';
import { UseFormReturn, BuildFormData } from '@/types';
import BuildBasicSection from "./BuildBasicSection";
import BuildVolumeSection from "./BuildVolumeSection";
import { BuildImagesSection } from "./BuildImagesSection";
import FormActions from "./FormActions";

interface BuildFormContainerProps {
  form: UseFormReturn<BuildFormData>;
  onSubmit: (data: BuildFormData) => void;
}

export const BuildFormContainer: React.FC<BuildFormContainerProps> = ({
  form,
  onSubmit
}) => {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <BuildBasicSection form={form} />
      <BuildVolumeSection form={form} />
      <BuildImagesSection 
        images={form.watch('images')}
        form={form}
      />
      <FormActions isSubmitting={false} />
    </form>
  );
};