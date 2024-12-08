import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ToolbarItemList } from './ToolbarItemList';
import { ToolbarControls } from './ToolbarControls';
import { useToolbarState } from './hooks/useToolbarState';
import { useToolbarHandlers } from './hooks/useToolbarHandlers';
import type { ToolbarItemType } from './types';

export const AdminToolbar = () => {
  const {
    isIconOnly,
    isLocked,
    isPersistent,
    orientation,
    toolbarItems,
    dropTarget,
    setDropTarget
  } = useToolbarState();

  const {
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleReorder,
    handleRemove,
    toggleLock,
    toggleOrientation
  } = useToolbarHandlers({
    isLocked,
    toolbarItems,
    setDropTarget
  });

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
        dropTarget !== null && "ring-2 ring-neon-cyan/30"
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <ToolbarControls
        isPersistent={isPersistent}
        isIconOnly={isIconOnly}
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
    </motion.div>
  );
};