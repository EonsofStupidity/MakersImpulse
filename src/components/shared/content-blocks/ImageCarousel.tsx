import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight } from "lucide-react";

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

  const slideVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      scale: 1.2,
      filter: "blur(12px)",
      rotateY: direction > 0 ? 15 : -15
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      rotateY: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 200,
        damping: 25
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      opacity: 0,
      scale: 0.8,
      filter: "blur(12px)",
      rotateY: direction < 0 ? 15 : -15,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 25
      }
    })
  };

  const [[page, direction], setPage] = useState([currentIndex, 0]);

  useEffect(() => {
    setPage([currentIndex, currentIndex > page ? 1 : -1]);
  }, [currentIndex]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Floating ESC message */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-4 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="flex items-center gap-2 bg-black/60 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
          <X size={16} className="text-white/80" />
          <span className="text-sm text-white/90">ESC to close</span>
        </div>
      </motion.div>

      {/* Image Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute w-full h-full flex items-center justify-center"
          >
            <img
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-4 bg-black/60 px-6 py-3 rounded-xl backdrop-blur-sm border border-white/10">
            <ArrowLeft size={20} className="text-white/80" />
            <div className="px-4 py-1 bg-white/10 rounded text-sm text-white/90">SPACE</div>
            <ArrowRight size={20} className="text-white/80" />
          </div>
          <span className="text-sm text-white/80">use to browse</span>
        </div>
      </motion.div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 z-50">
        {currentIndex + 1} of {images.length}
      </div>
    </div>
  );
};

export default ImageCarousel;