import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  className?: string;
}

const ImageCarousel = ({ 
  images, 
  currentIndex, 
  onIndexChange, 
  className = "" 
}: ImageCarouselProps) => {
  const [direction, setDirection] = useState(0);
  
  useEffect(() => {
    console.log('ImageCarousel mounted with images:', images);
    console.log('Current index:', currentIndex);
  }, [images, currentIndex]);

  const handleKeyPress = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowRight':
      case ' ':
        const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
        setDirection(1);
        onIndexChange(nextIndex);
        break;
      case 'ArrowLeft':
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
        setDirection(-1);
        onIndexChange(prevIndex);
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentIndex, images.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      scale: 0.95,
      y: direction > 0 ? 20 : -20,
      filter: "blur(8px)",
    }),
    center: {
      zIndex: 1,
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 150,
        damping: 20
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      opacity: 0,
      scale: 0.95,
      y: direction < 0 ? 20 : -20,
      filter: "blur(8px)",
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 150,
        damping: 20
      }
    })
  };

  const handleNext = () => {
    setDirection(1);
    onIndexChange(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
  };

  const handlePrev = () => {
    setDirection(-1);
    onIndexChange(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
  };

  return (
    <div className={`relative flex flex-col min-h-[80vh] ${className}`}>
      {/* ESC to close - floating above image */}
      <div className="absolute top-0 left-0 right-0 -translate-y-16 z-50">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <div className="flex items-center gap-2 bg-black/60 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
            <X size={16} className="text-white/80" />
            <span className="text-sm text-white/90">ESC to close</span>
          </div>
        </motion.div>
      </div>

      {/* Main image container with navigation arrows */}
      <div className="flex-1 relative flex items-center justify-center my-8">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 flex items-center justify-center"
          >
            <img
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows - positioned around image */}
        <button
          onClick={handlePrev}
          className="absolute left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/80 transition-colors z-20"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={handleNext}
          className="absolute right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/80 transition-colors z-20"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Controls and counter - below image */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-6 bg-black/60 px-8 py-3 rounded-xl backdrop-blur-sm border border-white/10">
              <ChevronLeft size={20} className="text-white/80" />
              <div className="px-4 py-1 bg-white/10 rounded text-sm text-white/90">SPACE</div>
              <ChevronRight size={20} className="text-white/80" />
            </div>
            <span className="text-sm text-white/80">use to browse</span>
          </div>

          <div className="text-white/80">
            {currentIndex + 1} of {images.length}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ImageCarousel;