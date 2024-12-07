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
      <DialogContent className="max-w-[95vw] h-[95vh] p-0 bg-black/90 border-none overflow-hidden">
        <ImageCarousel
          images={images}
          currentIndex={currentIndex}
          onIndexChange={onIndexChange}
          className="w-full h-full"
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImageCarouselDialog;