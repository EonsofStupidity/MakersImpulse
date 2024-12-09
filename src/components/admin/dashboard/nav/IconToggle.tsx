import React from 'react';
import { Button } from '@/components/ui/button';
import { SidebarClose, SidebarOpen } from 'lucide-react';
import { toast } from 'sonner';

interface IconToggleProps {
  isIconOnly: boolean;
  onToggle: () => void;
}

export const IconToggle = ({ isIconOnly, onToggle }: IconToggleProps) => {
  const handleToggle = () => {
    onToggle();
    toast.success(`Switched to ${isIconOnly ? 'full' : 'icon-only'} view`);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="relative group hover:bg-white/5"
    >
      {isIconOnly ? (
        <SidebarOpen className="w-4 h-4 text-white/80 group-hover:text-[#41f0db]" />
      ) : (
        <SidebarClose className="w-4 h-4 text-white/80 group-hover:text-[#41f0db]" />
      )}
    </Button>
  );
};