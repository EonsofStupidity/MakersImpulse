import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ToolbarContainerProps {
  children: React.ReactNode;
  orientation: 'horizontal' | 'vertical';
  dropTarget: number | null;
}

export const ToolbarContainer = ({ children, orientation, dropTarget }: ToolbarContainerProps) => {
  return (
    <motion.div
      className={cn(
        "fixed z-[100] flex transition-all duration-300",
        orientation === 'horizontal' ? 'top-20 right-4 flex-row' : 'top-20 right-4 flex-col',
        "bg-black/20 backdrop-blur-lg border border-white/10",
        "rounded-xl shadow-2xl overflow-visible",
        "before:absolute before:inset-0 before:rounded-xl before:z-0",
        "before:bg-gradient-to-r before:from-[#9b87f5]/20 before:to-[#ff69b4]/20",
        "before:animate-gradient before:bg-[length:200%_200%]",
        dropTarget !== null && "ring-2 ring-neon-cyan/30"
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      {children}
    </motion.div>
  );
};