import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlitchEffectProps {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

export const GlitchEffect = ({ children, className, isActive = true }: GlitchEffectProps) => {
  return (
    <motion.div
      className={cn(
        "relative",
        isActive && "animate-glitch",
        className
      )}
      initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
      animate={{ 
        clipPath: isActive ? "polygon(0 0, 100% 0, 98% 100%, 2% 100%)" : "polygon(0 0, 100% 0, 100% 0, 0 0)"
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 via-neon-pink/20 to-neon-purple/20 animate-gradient-flow" />
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
};