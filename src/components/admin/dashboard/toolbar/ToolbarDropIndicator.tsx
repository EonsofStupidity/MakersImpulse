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
          ? "h-full w-0.5 bg-[#41f0db]" 
          : "w-full h-0.5 bg-[#41f0db]",
        "opacity-0"
      )}
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.95,
      }}
      style={{
        left: orientation === 'horizontal' ? `${(index * 100) / itemCount}%` : 0,
        top: orientation === 'vertical' ? `${(index * 100) / itemCount}%` : 0,
      }}
    />
  );
};