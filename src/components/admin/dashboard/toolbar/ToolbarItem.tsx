import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, X, Check } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import type { ToolbarItemProps } from './types';

export const ToolbarItem = ({ 
  item, 
  index,
  isIconOnly, 
  isLocked,
  onDragOver, 
  onDragLeave,
  onDrop,
  onReorder,
  onRemove 
}: ToolbarItemProps) => {
  const navigate = useNavigate();
  let IconComponent: LucideIcon | null = null;

  try {
    if (typeof item.icon === 'string') {
      const icons = LucideIcons as unknown as Record<string, LucideIcon>;
      IconComponent = icons[item.icon];
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

  const handleClick = () => {
    if (item.to) {
      console.log('Navigating to:', item.to);
      navigate(item.to);
      toast.success(`Navigating to ${item.label}`);
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (isLocked) {
      e.preventDefault();
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
      
      // Set custom drag image with text
      const dragImage = document.createElement('div');
      dragImage.className = 'bg-black/80 text-white px-4 py-2 rounded-lg';
      dragImage.textContent = `Moving ${item.label}`;
      document.body.appendChild(dragImage);
      e.dataTransfer.setDragImage(dragImage, 0, 0);
      setTimeout(() => document.body.removeChild(dragImage), 0);
      
      toast.info('Dragging toolbar item...', {
        description: `Moving ${item.label}`
      });
    } catch (error) {
      console.error('Error in drag start:', error);
      toast.error('Failed to start drag operation');
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    if (isLocked) return;
    
    try {
      e.preventDefault();
      const draggedIndex = parseInt(e.dataTransfer.getData('toolbar-index'));
      
      if (!isNaN(draggedIndex) && draggedIndex !== index) {
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
        isLocked ? "cursor-pointer" : "cursor-grab active:cursor-grabbing"
      )}
      draggable={!isLocked}
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragOver={(e) => {
        if (!isLocked) {
          e.preventDefault();
          onDragOver(e);
        }
      }}
      onDragLeave={(e) => {
        if (!isLocked) {
          onDragLeave(e);
        }
      }}
      onDrop={(e) => {
        if (!isLocked) {
          onDrop(e);
        }
      }}
      onClick={handleClick}
    >
      <motion.div
        className={cn(
          "p-2 rounded-lg transition-all group w-full",
          isLocked 
            ? "bg-white/5 hover:bg-white/10 text-white/80 hover:text-[#ff69b4]"
            : "bg-white/5 hover:bg-white/10 text-white/80 hover:text-[#ff69b4]"
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
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
      </motion.div>
    </div>
  );
};