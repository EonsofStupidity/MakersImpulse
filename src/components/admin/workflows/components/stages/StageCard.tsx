import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { GripVertical, X } from 'lucide-react';
import { StageTypeSelector } from './StageTypeSelector';
import type { WorkflowStage } from '../../types';

interface StageCardProps {
  stage: WorkflowStage;
  index: number;
  onUpdate: (stageId: string, updates: Partial<WorkflowStage>) => void;
  onDelete: (stageId: string) => void;
  dragHandleProps?: any;
}

export const StageCard = ({ 
  stage, 
  index, 
  onUpdate, 
  onDelete,
  dragHandleProps 
}: StageCardProps) => {
  return (
    <Card className="p-4 bg-white/5 border-white/10 hover:border-neon-cyan/50 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div
          {...dragHandleProps}
          className="mt-2 cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-6 h-6 text-white/60" />
        </div>
        
        <div className="w-8 h-8 rounded-full bg-neon-cyan/20 flex items-center justify-center border border-neon-cyan/50 shrink-0">
          {index + 1}
        </div>
        
        <div className="flex-1 space-y-4">
          <Input
            value={stage.name}
            onChange={(e) => onUpdate(stage.id, { name: e.target.value })}
            placeholder={`Stage ${index + 1} name`}
            className="bg-white/5 border-white/10 text-white"
          />
          
          <div className="space-y-2">
            <label className="text-sm text-white/70">Stage Type</label>
            <StageTypeSelector
              value={stage.type}
              onChange={(value) => onUpdate(stage.id, { type: value })}
            />
          </div>

          <Textarea
            value={stage.description}
            onChange={(e) => onUpdate(stage.id, { description: e.target.value })}
            placeholder="Stage description (optional)"
            className="bg-white/5 border-white/10 text-white"
            rows={2}
          />
        </div>

        <Button
          type="button"
          variant="ghost"
          onClick={() => onDelete(stage.id)}
          className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};