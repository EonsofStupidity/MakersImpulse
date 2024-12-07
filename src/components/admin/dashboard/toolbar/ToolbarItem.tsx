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
  index: number;
  isIconOnly: boolean;
  isLocked: boolean;
  onDragOver: (event: React.DragEvent<HTMLButtonElement>) => void;
  onDrop: (event: React.DragEvent<HTMLButtonElement>) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
}

export const ToolbarItem = ({ 
  item, 
  index,
  isIconOnly, 
  isLocked,
  onDragOver, 
  onDrop,
  onReorder 
}: ToolbarItemProps) => {
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

  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>) => {
    if (isLocked) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('toolbar-index', index.toString());
  };

  const handleDragEnter = (e: React.DragEvent<HTMLButtonElement>) => {
    if (isLocked) return;
    
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData('toolbar-index'));
    if (draggedIndex !== index) {
      onReorder(draggedIndex, index);
    }
  };

  return (
    <motion.button
      className={cn(
        "p-2 rounded-lg transition-all group",
        isLocked 
          ? "bg-white/5 text-white/60"
          : "bg-white/5 hover:bg-white/10 text-white/80 hover:text-[#ff69b4]"
      )}
      whileHover={!isLocked ? { scale: 1.1 } : {}}
      whileTap={!isLocked ? { scale: 0.95 } : {}}
      onDragOver={onDragOver}
      onDrop={onDrop}
      draggable={!isLocked}
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
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