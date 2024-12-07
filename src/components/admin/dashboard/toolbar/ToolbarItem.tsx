import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

export interface ToolbarItemType {
  id: string;
  icon: LucideIcon;
  label: string;
}

interface ToolbarItemProps {
  item: ToolbarItemType;
  isIconOnly: boolean;
  onDragOver: (event: React.DragEvent<HTMLButtonElement>) => void;
  onDrop: (event: React.DragEvent<HTMLButtonElement>) => void;
}

export const ToolbarItem = ({ item, isIconOnly, onDragOver, onDrop }: ToolbarItemProps) => {
  return (
    <motion.button
      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-[#ff69b4] transition-all"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onDragOver={onDragOver}
      onDrop={onDrop}
      layout
    >
      <item.icon className="w-5 h-5" />
      {!isIconOnly && <span className="ml-2">{item.label}</span>}
    </motion.button>
  );
};