import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, RotateCw, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToolbarItem {
  id: string;
  icon: React.ElementType;
  label: string;
}

export const AdminToolbar = () => {
  const [isIconOnly, setIsIconOnly] = useState(false);
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
  const [toolbarItems, setToolbarItems] = useState<ToolbarItem[]>([
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
    
    const draggedItemData = JSON.parse(event.dataTransfer.getData('application/json'));
    console.log('Dropped item data:', draggedItemData);
    
    const newItem: ToolbarItem = {
      id: draggedItemData.id,
      icon: draggedItemData.icon || Settings,
      label: draggedItemData.label,
    };

    const newItems = [...toolbarItems];
    newItems.splice(index, 0, newItem);
    setToolbarItems(newItems);
    setDropTarget(null);
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
            <motion.div
              className={cn(
                "absolute z-10 pointer-events-none",
                orientation === 'horizontal' 
                  ? "h-full w-0.5 bg-[#41f0db]" 
                  : "w-full h-0.5 bg-[#41f0db]",
                "opacity-0"
              )}
              animate={{
                opacity: dropTarget === index ? 1 : 0,
                scale: dropTarget === index ? 1 : 0.95,
              }}
              style={{
                left: orientation === 'horizontal' ? `${(index * 100) / toolbarItems.length}%` : 0,
                top: orientation === 'vertical' ? `${(index * 100) / toolbarItems.length}%` : 0,
              }}
            />
            
            <motion.button
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-[#ff69b4] transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              layout
            >
              <item.icon className="w-5 h-5" />
              {!isIconOnly && <span className="ml-2">{item.label}</span>}
            </motion.button>
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};