import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentIndex?: number;
}

export const ImageCarousel = ({ 
  images, 
  open, 
  onOpenChange,
  currentIndex = 0 
}: ImageCarouselProps) => {
  const [index, setIndex] = useState(currentIndex);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] flex items-center justify-center">
        <div className="relative w-full h-full">
          <Button
            variant="ghost"
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
            onClick={prev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <img
            src={images[index]}
            alt={`Image ${index + 1}`}
            className="w-full h-full object-contain"
          />
          
          <Button
            variant="ghost"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={next}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <p className="text-white bg-black/50 px-2 py-1 rounded">
              {index + 1} / {images.length}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};