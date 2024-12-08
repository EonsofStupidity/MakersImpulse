import { useEffect, useCallback } from 'react';
import { builderHistory } from '@/utils/builderHistory';
import { useToast } from '@/components/ui/use-toast';

export const useBuilderKeyboardShortcuts = (
  onSave: () => void,
  onPreviewToggle: () => void
) => {
  const { toast } = useToast();

  const handleKeyboardShortcut = useCallback((e: KeyboardEvent) => {
    // Save: Ctrl/Cmd + S
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      onSave();
      toast({
        title: "Changes saved",
        description: "Your changes have been saved successfully."
      });
    }
    
    // Undo: Ctrl/Cmd + Z
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      const state = builderHistory.undo();
      if (state) {
        toast({
          title: "Undo",
          description: "Last change undone"
        });
      }
    }
    
    // Redo: Ctrl/Cmd + Shift + Z
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
      e.preventDefault();
      const state = builderHistory.redo();
      if (state) {
        toast({
          title: "Redo",
          description: "Change reapplied"
        });
      }
    }
    
    // Preview: Ctrl/Cmd + P
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      e.preventDefault();
      onPreviewToggle();
    }
  }, [onSave, onPreviewToggle, toast]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardShortcut);
    return () => window.removeEventListener('keydown', handleKeyboardShortcut);
  }, [handleKeyboardShortcut]);
};