import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      case 'Escape':
        // This will be handled by the Dialog component
        break;
    }
  };

  const handleWheel = (e: WheelEvent) => {
    if (e.deltaY > 0) {
      onIndexChange(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
    } else {
      onIndexChange(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [currentIndex, images.length]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full h-full"
        >
          <img
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            className="w-full h-full object-contain"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ImageCarousel;