import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, RotateCw, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminToolbarProps {
  className?: string;
}

export const AdminToolbar = ({ className }: AdminToolbarProps) => {
  const [isIconOnly, setIsIconOnly] = useState(false);
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');

  const toggleOrientation = () => {
    setOrientation(prev => prev === 'horizontal' ? 'vertical' : 'horizontal');
  };

  return (
    <motion.div
      className={cn(
        "fixed z-50 flex transition-all duration-300",
        orientation === 'horizontal' ? 'top-20 right-4 flex-row' : 'top-20 right-4 flex-col',
        "bg-black/20 backdrop-blur-lg border border-white/10",
        "rounded-xl shadow-2xl",
        "before:absolute before:inset-0 before:rounded-xl",
        "before:bg-gradient-to-r before:from-[#9b87f5]/20 before:to-[#ff69b4]/20",
        "before:animate-gradient before:bg-[length:200%_200%]",
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className={cn(
        "relative flex gap-2 p-2",
        orientation === 'horizontal' ? 'flex-row' : 'flex-col'
      )}>
        <motion.button
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-[#ff69b4] transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsIconOnly(!isIconOnly)}
        >
          <Settings className="w-5 h-5" />
          {!isIconOnly && <span className="ml-2">Settings</span>}
        </motion.button>

        <motion.button
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-[#7FFFD4] transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleOrientation}
        >
          <RotateCw className="w-5 h-5" />
          {!isIconOnly && <span className="ml-2">Rotate</span>}
        </motion.button>

        <motion.button
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-[#E6E6FA] transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Minimize2 className="w-5 h-5" />
          {!isIconOnly && <span className="ml-2">Minimize</span>}
        </motion.button>
      </div>
    </motion.div>
  );
};