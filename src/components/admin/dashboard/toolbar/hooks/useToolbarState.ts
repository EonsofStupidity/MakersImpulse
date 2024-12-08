import { useState, useEffect } from 'react';
import type { ToolbarItemType } from '../types';

export const useToolbarState = () => {
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

  return {
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
  };
};