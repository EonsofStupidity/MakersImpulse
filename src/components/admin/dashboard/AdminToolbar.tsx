import React, { useEffect } from 'react';
import { ToolbarItemList } from './toolbar/ToolbarItemList';
import { ToolbarControls } from './toolbar/ToolbarControls';
import { ToolbarContainer } from './toolbar/components/ToolbarContainer';
import { useToolbarState } from './toolbar/hooks/useToolbarState';
import { useToolbarHandlers } from './toolbar/hooks/useToolbarHandlers';
import { toast } from 'sonner';

export const AdminToolbar = () => {
  const {
    isIconOnly,
    setIsIconOnly,
    isLocked,
    setIsLocked,
    isPersistent,
    setIsPersistent,
    orientation,
    setOrientation,
    toolbarItems,
    setToolbarItems,
    dropTarget,
    setDropTarget
  } = useToolbarState();

  const {
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleReorder,
    handleRemove
  } = useToolbarHandlers(isLocked, toolbarItems, setToolbarItems, setDropTarget);

  // Add window-level drop handler for deletion
  useEffect(() => {
    const handleWindowDrop = (event: DragEvent) => {
      const jsonData = event.dataTransfer?.getData('application/json');
      if (jsonData) {
        try {
          const draggedItemData = JSON.parse(jsonData);
          const itemIndex = toolbarItems.findIndex(item => item.id === draggedItemData.id);
          if (itemIndex !== -1) {
            const newItems = toolbarItems.filter((_, i) => i !== itemIndex);
            setToolbarItems(newItems);
            toast.success('Shortcut removed', {
              description: `${draggedItemData.label} has been removed from your shortcuts`
            });
          }
        } catch (error) {
          console.error('Error handling window drop:', error);
        }
      }
    };

    window.addEventListener('drop', handleWindowDrop);
    window.addEventListener('dragover', (e) => e.preventDefault());

    return () => {
      window.removeEventListener('drop', handleWindowDrop);
      window.removeEventListener('dragover', (e) => e.preventDefault());
    };
  }, [toolbarItems]);

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
    <ToolbarContainer orientation={orientation} dropTarget={dropTarget}>
      <ToolbarControls
        isPersistent={isPersistent}
        setIsPersistent={setIsPersistent}
        isIconOnly={isIconOnly}
        setIsIconOnly={setIsIconOnly}
        orientation={orientation}
        isLocked={isLocked}
        onToggleOrientation={toggleOrientation}
        onToggleLock={toggleLock}
      />
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
    </ToolbarContainer>
  );
};