import { BuildFormData, BuildImage } from './core';
import { UseFormReturn } from '@/types';

export interface BuildFormContainerProps {
  form: UseFormReturn<BuildFormData>;
  onSubmit: (data: BuildFormData) => void;
}

export interface BuildImagesSectionProps {
  images: BuildImage[];
  onImagesChange: (images: BuildImage[]) => void;
}
