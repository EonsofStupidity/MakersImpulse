import React from 'react';
import { Button } from '@/components/ui/button';
import { SidebarClose, SidebarOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconToggleProps {
  isIconOnly: boolean;
  onToggle: () => void;
}

export const IconToggle = ({ isIconOnly, onToggle }: IconToggleProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className={cn(
        "relative group",
        "hover:bg-white/5",
        "ml-4 transition-all duration-300"
      )}
    >
      {isIconOnly ? (
        <SidebarOpen className="w-5 h-5 text-white/80 group-hover:text-neon-cyan" />
      ) : (
        <SidebarClose className="w-5 h-5 text-white/80 group-hover:text-neon-cyan" />
      )}
    </Button>
  );
};