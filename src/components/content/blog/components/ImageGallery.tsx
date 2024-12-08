import React from 'react';
import { motion } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

interface ImageGalleryProps {
  images: string[];
  onImageClick?: (index: number) => void;
  onImageRemove?: (index: number) => void;
  editable?: boolean;
  isLoading?: boolean;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  onImageClick,
  onImageRemove,
  editable = false,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {[1, 2, 3, 4].map((_, index) => (
          <Skeleton
            key={index}
            className="aspect-square w-full bg-white/5 rounded-lg"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 transform translate-y-1/2">
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="relative group aspect-square"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <img
            src={image}
            alt={`Gallery image ${index + 1}`}
            className="w-full h-full object-cover rounded-lg cursor-pointer
              border border-[#41f0db]/20 hover:border-[#41f0db]/60 transition-all
              group-hover:scale-[1.02] duration-200 hover:shadow-[0_0_20px_rgba(65,240,219,0.3)]"
            onClick={() => onImageClick?.(index)}
          />
          {editable && onImageRemove && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onImageRemove(index);
              }}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60
                opacity-0 group-hover:opacity-100 transition-opacity
                hover:bg-[#ff0abe]/20 border border-transparent
                hover:border-[#ff0abe]/50"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default ImageGallery;