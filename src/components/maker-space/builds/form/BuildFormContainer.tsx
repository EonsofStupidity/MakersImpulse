import React from "react";
import { useForm } from "react-hook-form";
import { Build, BuildFormData, BuildVolume } from "@/types";
import { BuildBasicSection } from "./BuildBasicSection";
import { BuildVolumeSection } from "./BuildVolumeSection";
import { BuildImagesSection } from "./BuildImagesSection";
import { FormActions } from "./FormActions";

interface BuildFormContainerProps {
  initialData?: BuildFormData;
  onSubmit: (data: BuildFormData) => void;
}

const BuildFormContainer: React.FC<BuildFormContainerProps> = ({ initialData, onSubmit }) => {
  const form = useForm<BuildFormData>({
    defaultValues: initialData,
  });

  const handleSubmit = (data: BuildFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <BuildBasicSection form={form} />
      <BuildVolumeSection form={form} />
      <BuildImagesSection form={form} />
      <FormActions isSubmitting={form.formState.isSubmitting} />
    </form>
  );
};

export default BuildFormContainer;
