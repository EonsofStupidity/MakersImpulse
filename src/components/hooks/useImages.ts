import { useState } from "react";

export const useImages = () => {
  const [images, setImages] = useState<File[]>([]);

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...uploadedFiles]);
    }
  };

  const deleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return { images, uploadImage, deleteImage };
};