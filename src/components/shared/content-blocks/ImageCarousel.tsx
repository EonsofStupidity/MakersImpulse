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
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    })
  };

  const [[page, direction], setPage] = useState([currentIndex, 0]);

  useEffect(() => {
    setPage([currentIndex, currentIndex > page ? 1 : -1]);
  }, [currentIndex]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Visual cues */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 text-white/80 flex flex-col items-center gap-4 z-50"
      >
        <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
          <X size={16} className="text-white/60" />
          <span className="text-sm">ESC to close</span>
        </div>
        
        <div className="flex flex-col items-center gap-2 bg-black/40 px-6 py-3 rounded-xl backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <ArrowLeft size={20} className="text-white/60" />
            <div className="px-4 py-1 bg-white/10 rounded text-sm">SPACE</div>
            <ArrowRight size={20} className="text-white/60" />
          </div>
          <span className="text-sm text-white/60">use to browse</span>
        </div>
      </motion.div>

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute w-full h-full"
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