import React from 'react';
import { motion } from 'framer-motion';

interface ImageThumbnailsProps {
  images: string[];
  onImageClick: (index: number) => void;
}

const ImageThumbnails: React.FC<ImageThumbnailsProps> = ({ images, onImageClick }) => {
  return (
    <motion.div 
      className="absolute left-8 right-8 -bottom-8 grid grid-cols-5 gap-2"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {images.slice(0, 5).map((image, index) => (
        <motion.div 
          key={index} 
          className="relative aspect-square overflow-hidden rounded-lg border border-[#ff0abe]/20 shadow-lg shadow-[#ff0abe]/10 cursor-pointer"
          whileHover={{ y: -5, scale: 1.05 }}
          transition={{ duration: 0.2 }}
          onClick={() => onImageClick(index)}
        >
          <motion.div
            className="absolute inset-0 bg-[#ff0abe]/20 mix-blend-overlay"
            whileHover={{ opacity: 0 }}
          />
          <img 
            src={image} 
            alt="" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ImageThumbnails;