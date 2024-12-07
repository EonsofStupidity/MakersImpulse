import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, RotateCw, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ToolbarItemList } from './toolbar/ToolbarItemList';
import { ToolbarItemType } from './toolbar/types';
import { toast } from 'sonner';

export const AdminToolbar = () => {
  const [isIconOnly, setIsIconOnly] = useState(false);
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
  const [toolbarItems, setToolbarItems] = useState<ToolbarItemType[]>([
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'rotate', icon: RotateCw, label: 'Rotate' },
    { id: 'minimize', icon: Minimize2, label: 'Minimize' },
  ]);
  const [dropTarget, setDropTarget] = useState<number | null>(null);

  const handleDragOver = (event: React.DragEvent<HTMLButtonElement>, index: number) => {
    try {
      event.preventDefault();
      console.log('Drag over event at index:', index);
      setDropTarget(index);
    } catch (error) {
      console.error('Error in handleDragOver:', error);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLButtonElement>, index: number) => {
    try {
      event.preventDefault();
      console.log('Drop event:', event);
      
      const jsonData = event.dataTransfer.getData('application/json');
      console.log('Received JSON data:', jsonData);
      
      if (!jsonData) {
        throw new Error('No data received in drop event');
      }

      const draggedItemData = JSON.parse(jsonData);
      console.log('Parsed dropped item data:', draggedItemData);
      
      if (!draggedItemData.id || !draggedItemData.icon || !draggedItemData.label) {
        throw new Error('Invalid item data structure');
      }

      const newItem: ToolbarItemType = {
        id: draggedItemData.id,
        icon: draggedItemData.icon,
        label: draggedItemData.label,
      };

      console.log('Creating new toolbar item:', newItem);

      const newItems = [...toolbarItems];
      newItems.splice(index, 0, newItem);
      setToolbarItems(newItems);
      setDropTarget(null);

      toast.success('Item added to toolbar successfully');
    } catch (error) {
      console.error('Error handling drop:', error);
      toast.error('Failed to add item to toolbar');
    }
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
        "before:animate-gradient before:bg-[length:200%_200%]"
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <ToolbarItemList
        items={toolbarItems}
        isIconOnly={isIconOnly}
        orientation={orientation}
        dropTarget={dropTarget}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      />
    </motion.div>
  );
};