import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ToolbarItemList } from './toolbar/ToolbarItemList';
import { ToolbarControls } from './toolbar/ToolbarControls';
import { ToolbarItemType } from './toolbar/types';
import { toast } from 'sonner';
import { Check, X } from 'lucide-react';

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
  const [isDraggingOverToolbar, setIsDraggingOverToolbar] = useState(false);

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
    setIsDraggingOverToolbar(true);
    setDropTarget(index);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    if (isLocked) return;
    event.stopPropagation();
    setIsDraggingOverToolbar(false);
    setDropTarget(null);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    if (isLocked) {
      toast.error('Toolbar is locked. Unlock it to add shortcuts.');
      return;
    }

    try {
      event.preventDefault();
      event.stopPropagation();
      setIsDraggingOverToolbar(false);
      setDropTarget(null);
      
      const jsonData = event.dataTransfer.getData('application/json');
      if (!jsonData) {
        throw new Error('No data received in drop event');
      }

      const draggedItemData = JSON.parse(jsonData);
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

      const newItems = [...toolbarItems];
      newItems.splice(index, 0, newItem);
      setToolbarItems(newItems);

      toast.success('Shortcut added to toolbar', {
        description: `${draggedItemData.label} has been added to your shortcuts`
      });
    } catch (error) {
      console.error('Error handling drop:', error);
      toast.error('Failed to add shortcut to toolbar');
    }
  };

  const handleGlobalDrop = (event: React.DragEvent<HTMLDivElement>) => {
    if (!isDraggingOverToolbar && event.dataTransfer.getData('toolbar-index')) {
      event.preventDefault();
      const index = parseInt(event.dataTransfer.getData('toolbar-index'));
      const removedItem = toolbarItems[index];
      const newItems = toolbarItems.filter((_, i) => i !== index);
      setToolbarItems(newItems);
      toast.success('Shortcut removed', {
        description: `${removedItem.label} has been removed from your shortcuts`
      });
    }
  };

  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      if (e.dataTransfer?.getData('toolbar-index')) {
        e.preventDefault();
      }
    };

    document.addEventListener('dragover', handleDragOver);
    return () => document.removeEventListener('dragover', handleDragOver);
  }, []);

  return (
    <>
      <motion.div
        className={cn(
          "fixed z-[100] flex transition-all duration-300",
          orientation === 'horizontal' ? 'top-20 right-4 flex-row' : 'top-20 right-4 flex-col',
          "bg-black/20 backdrop-blur-lg border border-white/10",
          "rounded-xl shadow-2xl overflow-visible",
          isDraggingOverToolbar && "ring-2 ring-neon-cyan"
        )}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
      >
        <ToolbarControls
          isPersistent={isPersistent}
          setIsPersistent={setIsPersistent}
          isIconOnly={isIconOnly}
          setIsIconOnly={setIsIconOnly}
          orientation={orientation}
          isLocked={isLocked}
          onToggleOrientation={() => setOrientation(prev => prev === 'horizontal' ? 'vertical' : 'horizontal')}
          onToggleLock={() => setIsLocked(!isLocked)}
        />
        <ToolbarItemList
          items={toolbarItems}
          isIconOnly={isIconOnly}
          orientation={orientation}
          dropTarget={dropTarget}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onReorder={(fromIndex, toIndex) => {
            if (isLocked) return;
            const newItems = [...toolbarItems];
            const [movedItem] = newItems.splice(fromIndex, 1);
            newItems.splice(toIndex, 0, movedItem);
            setToolbarItems(newItems);
          }}
          isLocked={isLocked}
        />
      </motion.div>

      {/* Drop indicator overlay */}
      {toolbarItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isDraggingOverToolbar ? 0 : 1,
            display: isDraggingOverToolbar ? 'none' : 'flex'
          }}
          className="fixed inset-0 pointer-events-none z-[99] flex items-center justify-center"
        >
          {isDraggingOverToolbar ? (
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/80 text-neon-cyan">
              <Check className="w-5 h-5" />
              <span>Drop to place</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/80 text-red-400">
              <X className="w-5 h-5" />
              <span>Drop to delete</span>
            </div>
          )}
        </motion.div>
      )}

      {/* Global drop zone for deletion */}
      <div 
        className="fixed inset-0 z-[98]" 
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleGlobalDrop}
      />
    </>
  );
};