import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

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
  const handleKeyPress = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowRight':
      case ' ':
        onIndexChange(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
        break;
      case 'ArrowLeft':
        onIndexChange(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentIndex, images.length]);

  const [[page, direction], setPage] = useState([currentIndex, 0]);

  useEffect(() => {
    setPage([currentIndex, currentIndex > page ? 1 : -1]);
  }, [currentIndex]);

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

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div className="flex flex-col items-center justify-center h-full">
        {/* ESC to close message - floating above image */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-4 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="flex items-center gap-2 bg-black/60 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
            <X size={16} className="text-white/80" />
            <span className="text-sm text-white/90">ESC to close</span>
          </div>
        </motion.div>

        {/* Main image container */}
        <div className="relative w-full flex-1 flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center p-8"
            >
              <img
                src={images[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
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

        {/* Controls and counter - centered below image */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-6 bg-black/60 px-8 py-3 rounded-xl backdrop-blur-sm border border-white/10">
                <ArrowLeft size={20} className="text-white/80" />
                <div className="px-4 py-1 bg-white/10 rounded text-sm text-white/90">SPACE</div>
                <ArrowRight size={20} className="text-white/80" />
              </div>
              <span className="text-sm text-white/80">use to browse</span>
            </div>
          </motion.div>

          <div className="text-white/80">
            {currentIndex + 1} of {images.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;