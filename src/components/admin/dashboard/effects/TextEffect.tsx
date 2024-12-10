import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextEffectProps {
  text: string;
  className?: string;
  initialColor?: string;
  hoverColor?: string;
}

export const TextEffect = ({ 
  text, 
  className,
  initialColor = "text-white",
  hoverColor = "text-[#ff0abe]"
}: TextEffectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const letterWidth = rect.width / text.length;
    const index = Math.floor(x / letterWidth);
    
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex">
        {text.split('').map((letter, index) => (
          <motion.span
            key={index}
            className={cn(
              "transition-colors duration-300",
              initialColor,
              index === activeIndex && hoverColor
            )}
            animate={{
              color: index === activeIndex ? hoverColor : initialColor,
            }}
            transition={{ duration: 0.3 }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};