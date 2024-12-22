export interface ImageUploadZoneProps {
  images: File[];
  onImagesChange: (newImages: File[]) => Promise<void>;
  isUploading?: boolean;
  maxFiles?: number;
  acceptedTypes?: string[];
}