import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, RotateCw, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ToolbarItem, ToolbarItemType } from './toolbar/ToolbarItem';
import { ToolbarDropIndicator } from './toolbar/ToolbarDropIndicator';

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
    event.preventDefault();
    setDropTarget(index);
  };

  const handleDrop = (event: React.DragEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault();
    console.log('Drop event:', event);
    
    try {
      const draggedItemData = JSON.parse(event.dataTransfer.getData('application/json'));
      console.log('Dropped item data:', draggedItemData);
      
      const newItem: ToolbarItemType = {
        id: draggedItemData.id,
        icon: draggedItemData.icon,
        label: draggedItemData.label,
      };

      const newItems = [...toolbarItems];
      newItems.splice(index, 0, newItem);
      setToolbarItems(newItems);
      setDropTarget(null);
    } catch (error) {
      console.error('Error handling drop:', error);
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
      <div className={cn(
        "relative flex gap-2 p-2",
        orientation === 'horizontal' ? 'flex-row' : 'flex-col'
      )}>
        {toolbarItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <ToolbarDropIndicator
              orientation={orientation}
              isActive={dropTarget === index}
              index={index}
              itemCount={toolbarItems.length}
            />
            <ToolbarItem
              item={item}
              isIconOnly={isIconOnly}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
            />
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};