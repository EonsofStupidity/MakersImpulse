import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, RotateCw, ArrowLeftRight, Lock, Unlock } from 'lucide-react';
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

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    if (isLocked) return;
    
    event.preventDefault();
    event.stopPropagation();
    console.log('Drag over event at index:', index);
    
    const target = event.currentTarget;
    target.style.background = 'rgba(65, 240, 219, 0.1)';
    target.style.transform = 'scale(1.02)';
    
    setDropTarget(index);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    if (isLocked) return;
    
    event.stopPropagation();
    const target = event.currentTarget;
    target.style.background = '';
    target.style.transform = '';
    
    console.log('Drag leave event');
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    if (isLocked) {
      toast.error('Toolbar is locked. Unlock it to add shortcuts.');
      return;
    }

    try {
      event.preventDefault();
      event.stopPropagation();
      console.log('Drop event:', event);
      
      const target = event.currentTarget;
      target.style.background = '';
      target.style.transform = '';
      
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

      const itemExists = toolbarItems.some(item => item.id === draggedItemData.id);
      if (itemExists) {
        toast.error('This shortcut already exists in the toolbar');
        return;
      }

      const newItem: ToolbarItemType = {
        id: draggedItemData.id,
        icon: draggedItemData.icon,
        label: draggedItemData.label,
        to: draggedItemData.to
      };

      console.log('Creating new toolbar item:', newItem);

      const newItems = [...toolbarItems];
      newItems.splice(index, 0, newItem);
      setToolbarItems(newItems);
      setDropTarget(null);

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

  const handleRemove = (index: number) => {
    if (isLocked) return;

    const removedItem = toolbarItems[index];
    const newItems = toolbarItems.filter((_, i) => i !== index);
    setToolbarItems(newItems);
    
    toast.success('Shortcut removed', {
      description: `${removedItem.label} has been removed from your shortcuts`
    });
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
    toast.success(isLocked ? 'Toolbar unlocked' : 'Toolbar locked', {
      description: isLocked ? 'You can now modify shortcuts' : 'Shortcuts and controls are now locked'
    });
  };

  const toggleOrientation = () => {
    if (isLocked) {
      toast.error('Unlock the toolbar to change orientation');
      return;
    }
    setOrientation(prev => prev === 'horizontal' ? 'vertical' : 'horizontal');
    toast.success(`Toolbar orientation changed to ${orientation === 'horizontal' ? 'vertical' : 'horizontal'}`);
  };

  return (
    <motion.div
      className={cn(
        "fixed z-[100] flex transition-all duration-300",
        orientation === 'horizontal' ? 'top-20 right-4 flex-row' : 'top-20 right-4 flex-col',
        "bg-black/20 backdrop-blur-lg border border-white/10",
        "rounded-xl shadow-2xl overflow-visible",
        "before:absolute before:inset-0 before:rounded-xl before:z-0",
        "before:bg-gradient-to-r before:from-[#9b87f5]/20 before:to-[#ff69b4]/20",
        "before:animate-gradient before:bg-[length:200%_200%]",
        dropTarget !== null && "ring-2 ring-[#41f0db]/30"
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="absolute -top-12 right-0 flex items-center gap-4 text-white/80 z-[101]">
        <div className="flex items-center gap-2">
          <span className="text-sm">Persist Toolbar</span>
          <Switch
            checked={isPersistent}
            onCheckedChange={setIsPersistent}
            className="data-[state=checked]:bg-[#41f0db]"
            disabled={isLocked}
          />
        </div>
        <button
          onClick={() => {
            if (isLocked) {
              toast.error('Unlock the toolbar to toggle labels');
              return;
            }
            setIsIconOnly(!isIconOnly);
          }}
          className={cn(
            "p-2 rounded-lg transition-colors duration-200",
            isLocked ? "opacity-50 cursor-not-allowed" : "bg-white/5 text-white/60 hover:text-white"
          )}
          title={isIconOnly ? "Show labels" : "Hide labels"}
          disabled={isLocked}
        >
          <ArrowLeftRight className="w-4 h-4" />
        </button>
        <button
          onClick={toggleOrientation}
          className={cn(
            "p-2 rounded-lg transition-colors duration-200",
            isLocked ? "opacity-50 cursor-not-allowed" : "bg-white/5 text-white/60 hover:text-white"
          )}
          title="Toggle orientation"
          disabled={isLocked}
        >
          <RotateCw className="w-4 h-4" />
        </button>
        <button
          onClick={toggleLock}
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
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onReorder={handleReorder}
          onRemove={handleRemove}
          isLocked={isLocked}
        />
      </AnimatePresence>
    </motion.div>
  );
};