import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, RotateCw, Minimize2, Lock, Unlock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ToolbarItemList } from './toolbar/ToolbarItemList';
import { ToolbarItemType } from './toolbar/types';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';

export const AdminToolbar = () => {
  const [isIconOnly, setIsIconOnly] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isPersistent, setIsPersistent] = useState(() => {
    const saved = localStorage.getItem('adminToolbarPersistent');
    return saved ? JSON.parse(saved) : false;
  });
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>(() => {
    const saved = localStorage.getItem('adminToolbarOrientation');
    return (saved as 'horizontal' | 'vertical') || 'horizontal';
  });
  const [toolbarItems, setToolbarItems] = useState<ToolbarItemType[]>(() => {
    const saved = localStorage.getItem('adminToolbarItems');
    return saved ? JSON.parse(saved) : [];
  });
  const [dropTarget, setDropTarget] = useState<number | null>(null);

  useEffect(() => {
    if (isPersistent) {
      localStorage.setItem('adminToolbarItems', JSON.stringify(toolbarItems));
      localStorage.setItem('adminToolbarOrientation', orientation);
      localStorage.setItem('adminToolbarPersistent', JSON.stringify(isPersistent));
    } else {
      localStorage.removeItem('adminToolbarItems');
      localStorage.removeItem('adminToolbarOrientation');
      localStorage.removeItem('adminToolbarPersistent');
    }
  }, [toolbarItems, orientation, isPersistent]);

  const handleDragOver = (event: React.DragEvent<HTMLButtonElement>, index: number) => {
    if (isLocked) return;
    
    try {
      event.preventDefault();
      console.log('Drag over event at index:', index);
      setDropTarget(index);
    } catch (error) {
      console.error('Error in handleDragOver:', error);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLButtonElement>, index: number) => {
    if (isLocked) {
      toast.error('Toolbar is locked. Unlock it to add shortcuts.');
      return;
    }

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

      // Check if item already exists
      const itemExists = toolbarItems.some(item => item.id === draggedItemData.id);
      if (itemExists) {
        toast.error('This shortcut already exists in the toolbar');
        return;
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

      // Show success animation and toast
      toast.success('Shortcut added to toolbar', {
        description: `${draggedItemData.label} has been added to your shortcuts`
      });
    } catch (error) {
      console.error('Error handling drop:', error);
      toast.error('Failed to add shortcut to toolbar');
    }
  };

  const handleReorder = (fromIndex: number, toIndex: number) => {
    if (isLocked) return;
    
    const newItems = [...toolbarItems];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);
    setToolbarItems(newItems);
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
      <div className="absolute -top-12 right-0 flex items-center gap-4 text-white/80">
        <div className="flex items-center gap-2">
          <span className="text-sm">Persist Toolbar</span>
          <Switch
            checked={isPersistent}
            onCheckedChange={setIsPersistent}
            className="data-[state=checked]:bg-[#41f0db]"
          />
        </div>
        <button
          onClick={() => setIsLocked(!isLocked)}
          className={cn(
            "p-2 rounded-lg transition-colors duration-200",
            isLocked ? "bg-[#41f0db]/20 text-[#41f0db]" : "bg-white/5 text-white/60 hover:text-white"
          )}
        >
          {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
        </button>
      </div>
      <AnimatePresence mode="wait">
        <ToolbarItemList
          items={toolbarItems}
          isIconOnly={isIconOnly}
          orientation={orientation}
          dropTarget={dropTarget}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onReorder={handleReorder}
          isLocked={isLocked}
        />
      </AnimatePresence>
    </motion.div>
  );
};