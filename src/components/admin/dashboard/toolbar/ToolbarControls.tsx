import React from 'react';
import { ArrowLeftRight, Lock, RotateCw, Unlock } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ToolbarControlsProps {
  isPersistent: boolean;
  setIsPersistent: (value: boolean) => void;
  isIconOnly: boolean;
  setIsIconOnly: (value: boolean) => void;
  orientation: 'horizontal' | 'vertical';
  isLocked: boolean;
  onToggleOrientation: () => void;
  onToggleLock: () => void;
}

export const ToolbarControls = ({
  isPersistent,
  setIsPersistent,
  isIconOnly,
  setIsIconOnly,
  orientation,
  isLocked,
  onToggleOrientation,
  onToggleLock,
}: ToolbarControlsProps) => {
  return (
    <div className="absolute -top-12 right-0 flex items-center gap-4 text-white/80 z-[101]">
      <div className="flex items-center gap-2">
        <span className="text-sm">Persist Toolbar</span>
        <Switch
          checked={isPersistent}
          onCheckedChange={setIsPersistent}
          className="data-[state=checked]:bg-neon-cyan"
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
        onClick={onToggleOrientation}
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
        onClick={onToggleLock}
        className={cn(
          "p-2 rounded-lg transition-colors duration-200",
          isLocked ? "bg-neon-cyan/20 text-neon-cyan" : "bg-white/5 text-white/60 hover:text-white"
        )}
      >
        {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
      </button>
    </div>
  );
};