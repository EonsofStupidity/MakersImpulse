import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { toast } from 'sonner';

export interface ToolbarItemType {
  id: string;
  icon: string | LucideIcon;
  label: string;
}

interface ToolbarItemProps {
  item: ToolbarItemType;
  isIconOnly: boolean;
  onDragOver: (event: React.DragEvent<HTMLButtonElement>) => void;
  onDrop: (event: React.DragEvent<HTMLButtonElement>) => void;
}

export const ToolbarItem = ({ item, isIconOnly, onDragOver, onDrop }: ToolbarItemProps) => {
  let IconComponent: LucideIcon | null = null;

  try {
    if (typeof item.icon === 'string') {
      const icons = LucideIcons as any;
      IconComponent = icons[item.icon];
      console.log('Found icon component for:', item.icon);
    } else {
      IconComponent = item.icon;
    }
  } catch (error) {
    console.error('Error resolving icon:', error);
    toast.error(`Failed to load icon for ${item.label}`);
    return null;
  }

  if (!IconComponent) {
    console.error(`Icon not found: ${item.icon}`);
    return null;
  }

  return (
    <motion.button
      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-[#ff69b4] transition-all group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onDragOver={onDragOver}
      onDrop={onDrop}
      layout
    >
      <div className="flex items-center gap-2">
        <IconComponent className="w-5 h-5" />
        {!isIconOnly && (
          <span className="ml-2 opacity-80 group-hover:opacity-100 transition-opacity">
            {item.label}
          </span>
        )}
      </div>
    </motion.button>
  );
};