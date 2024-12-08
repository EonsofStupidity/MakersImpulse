import { useState, useCallback } from 'react';

export const useCyberpunkViewer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');

  const openViewer = useCallback((newContent: string) => {
    setContent(newContent);
    setIsOpen(true);
  }, []);

  const closeViewer = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    content,
    openViewer,
    closeViewer
  };
};