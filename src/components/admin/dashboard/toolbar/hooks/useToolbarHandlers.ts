import { toast } from 'sonner';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { ToolbarItemType } from '../types';

interface UseToolbarHandlersProps {
  isLocked: boolean;
  toolbarItems: ToolbarItemType[];
  setDropTarget: (target: number | null) => void;
}

export const useToolbarHandlers = ({ 
  isLocked, 
  toolbarItems,
  setDropTarget 
}: UseToolbarHandlersProps) => {
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    if (isLocked) return;
    event.preventDefault();
    event.stopPropagation();
    const target = event.currentTarget;
    target.style.background = 'rgba(65, 240, 219, 0.1)';
    target.style.transform = 'scale(1.02)';
    setDropTarget(index);
    
    toast.info('Drop to place shortcut', {
      id: 'toolbar-drag',
      description: `Release to add shortcut here`,
      icon: <CheckCircle2 className="h-4 w-4 text-[#41f0db]" />
    });
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    if (isLocked) return;
    event.stopPropagation();
    const target = event.currentTarget;
    target.style.background = '';
    target.style.transform = '';
    
    toast.info('Drop to delete shortcut', {
      id: 'toolbar-drag',
      description: `Release outside toolbar to remove`,
      icon: <XCircle className="h-4 w-4 text-red-400" />
    });
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    if (isLocked) {
      toast.error('Toolbar is locked. Unlock it to add shortcuts.');
      return;
    }

    try {
      event.preventDefault();
      event.stopPropagation();
      const target = event.currentTarget;
      target.style.background = '';
      target.style.transform = '';
      
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
    setDropTarget(null);
  };

  const handleRemove = (index: number) => {
    if (isLocked) return;
    const removedItem = toolbarItems[index];
    const newItems = toolbarItems.filter((_, i) => i !== index);
    setDropTarget(null);
    toast.success('Shortcut removed', {
      description: `${removedItem.label} has been removed from your shortcuts`
    });
  };

  const toggleLock = () => {
    setDropTarget(null);
    toast.success(isLocked ? 'Toolbar unlocked' : 'Toolbar locked', {
      description: isLocked ? 'You can now modify shortcuts' : 'Shortcuts and controls are now locked'
    });
  };

  const toggleOrientation = () => {
    if (isLocked) {
      toast.error('Unlock the toolbar to change orientation');
      return;
    }
    setDropTarget(null);
    toast.success(`Toolbar orientation changed to ${isLocked ? 'vertical' : 'horizontal'}`);
  };

  return {
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleReorder,
    handleRemove,
    toggleLock,
    toggleOrientation
  };
};
