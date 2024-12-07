import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import ImageCarousel from "@/components/shared/content-blocks/ImageCarousel";

interface ImageCarouselDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

const ImageCarouselDialog: React.FC<ImageCarouselDialogProps> = ({
  isOpen,
  onOpenChange,
  images,
  currentIndex,
  onIndexChange,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/90 border-none">
        <div className="relative w-full h-full flex items-center justify-center">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white z-50"
          >
            <X size={24} />
          </button>
          
          <ImageCarousel
            images={images}
            currentIndex={currentIndex}
            onIndexChange={onIndexChange}
            className="w-full h-full"
          />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80">
            {currentIndex + 1} of {images.length}
          </div>

          <button
            onClick={() => onIndexChange(currentIndex > 0 ? currentIndex - 1 : images.length - 1)}
            className="absolute left-4 text-white/80 hover:text-white"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={() => onIndexChange(currentIndex < images.length - 1 ? currentIndex + 1 : 0)}
            className="absolute right-4 text-white/80 hover:text-white"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCarouselDialog;