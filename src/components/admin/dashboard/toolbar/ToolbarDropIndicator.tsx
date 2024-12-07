import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ToolbarDropIndicatorProps {
  orientation: 'horizontal' | 'vertical';
  isActive: boolean;
  index: number;
  itemCount: number;
}

export const ToolbarDropIndicator = ({ 
  orientation, 
  isActive, 
  index,
  itemCount 
}: ToolbarDropIndicatorProps) => {
  return (
    <motion.div
      className={cn(
        "absolute z-10 pointer-events-none",
        orientation === 'horizontal' 
          ? "h-full w-1 bg-gradient-to-b from-[#41f0db] to-[#ff69b4]" 
          : "w-full h-1 bg-gradient-to-r from-[#41f0db] to-[#ff69b4]",
        "opacity-0 rounded-full"
      )}
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? [1, 1.2, 1] : 0.95,
      }}
      transition={{
        duration: 0.2,
        scale: {
          repeat: Infinity,
          duration: 1
        }
      }}
      style={{
        left: orientation === 'horizontal' ? `${(index * 100) / itemCount}%` : 0,
        top: orientation === 'vertical' ? `${(index * 100) / itemCount}%` : 0,
      }}
    />
  );
};