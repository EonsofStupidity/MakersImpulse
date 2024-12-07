import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import type { ToolbarItemProps } from './types';

export const ToolbarItem = ({ 
  item, 
  index,
  isIconOnly, 
  isLocked,
  onDragOver, 
  onDragLeave,
  onDrop,
  onReorder 
}: ToolbarItemProps) => {
  let IconComponent: LucideIcon | null = null;

  try {
    if (typeof item.icon === 'string') {
      const icons = LucideIcons as unknown as Record<string, LucideIcon>;
      IconComponent = icons[item.icon];
      console.log('Resolved icon component:', item.icon);
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

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (isLocked) {
      console.log('Drag prevented - toolbar is locked');
      e.preventDefault();
      toast.error('Toolbar is locked. Unlock it to reorder items.');
      return;
    }
    
    try {
      console.log('Starting drag operation:', {
        index,
        itemId: item.id,
        isLocked
      });
      
      e.dataTransfer.setData('toolbar-index', index.toString());
      e.dataTransfer.effectAllowed = 'move';
      
      toast.info('Dragging toolbar item...', {
        description: `Moving ${item.label}`
      });
    } catch (error) {
      console.error('Error in drag start:', error);
      toast.error('Failed to start drag operation');
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    if (isLocked) {
      console.log('Drag enter prevented - toolbar is locked');
      return;
    }
    
    try {
      e.preventDefault();
      const draggedIndex = parseInt(e.dataTransfer.getData('toolbar-index'));
      
      console.log('Drag enter event:', {
        draggedIndex,
        targetIndex: index,
        isLocked
      });

      if (!isNaN(draggedIndex) && draggedIndex !== index) {
        console.log('Reordering from', draggedIndex, 'to', index);
        onReorder(draggedIndex, index);
      }
    } catch (error) {
      console.error('Error in drag enter:', error);
    }
  };

  return (
    <div
      className={cn(
        "relative",
        isLocked ? "cursor-not-allowed" : "cursor-grab active:cursor-grabbing"
      )}
      draggable={!isLocked}
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragOver={(e) => {
        if (!isLocked) {
          e.preventDefault();
          console.log('Drag over event at index:', index);
          onDragOver(e);
        }
      }}
      onDragLeave={(e) => {
        if (!isLocked) {
          console.log('Drag leave event at index:', index);
          onDragLeave(e);
        }
      }}
      onDrop={(e) => {
        if (!isLocked) {
          console.log('Drop event at index:', index);
          onDrop(e);
        }
      }}
    >
      <motion.div
        className={cn(
          "p-2 rounded-lg transition-all group w-full",
          isLocked 
            ? "bg-white/5 text-white/60"
            : "bg-white/5 hover:bg-white/10 text-white/80 hover:text-[#ff69b4]"
        )}
        whileHover={!isLocked ? { scale: 1.1 } : undefined}
        whileTap={!isLocked ? { scale: 0.95 } : undefined}
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
        {!isLocked && (
          <motion.div
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#41f0db]/20 to-[#ff69b4]/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>
    </div>
  );
};