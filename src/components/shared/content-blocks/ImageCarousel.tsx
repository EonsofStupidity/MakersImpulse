import React from 'react';
import { Card } from '@/components/ui/card';

export interface ImageCarouselProps {
  images: string[];
  onImageClick?: (index: number) => void;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, onImageClick }) => {
  return (
    <Card className="overflow-hidden">
      <div className="flex gap-4 p-4 overflow-x-auto">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className="w-48 h-48 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onImageClick?.(index)}
          />
        ))}
      </div>
    </Card>
  );
};