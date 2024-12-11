import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, GripVertical, ArrowRight, X } from 'lucide-react';
import type { WorkflowStage } from '../types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface VisualWorkflowBuilderProps {
  stages: WorkflowStage[];
  onChange: (stages: WorkflowStage[]) => void;
}

export const VisualWorkflowBuilder = ({ stages, onChange }: VisualWorkflowBuilderProps) => {
  const addStage = () => {
    const newStage: WorkflowStage = {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      order: stages.length
    };
    onChange([...stages, newStage]);
  };

  const removeStage = (stageId: string) => {
    onChange(stages.filter(stage => stage.id !== stageId));
  };

  const updateStage = (stageId: string, updates: Partial<WorkflowStage>) => {
    onChange(stages.map(stage => 
      stage.id === stageId ? { ...stage, ...updates } : stage
    ));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(stages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order property for each stage
    const updatedStages = items.map((stage, index) => ({
      ...stage,
      order: index
    }));

    onChange(updatedStages);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Workflow Stages</h3>
        <Button
          onClick={addStage}
          className="bg-neon-cyan/20 text-white border border-neon-cyan/50 hover:bg-neon-cyan/30"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Stage
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="stages">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              <AnimatePresence>
                {stages.map((stage, index) => (
                  <Draggable key={stage.id} draggableId={stage.id} index={index}>
                    {(provided) => (
                      <motion.div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="relative"
                      >
                        <Card className="p-4 bg-white/5 border-white/10 hover:border-neon-cyan/50 transition-all duration-300">
                          <div className="flex items-start gap-4">
                            <div
                              {...provided.dragHandleProps}
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
                                onChange={(e) => updateStage(stage.id, { name: e.target.value })}
                                placeholder={`Stage ${index + 1} name`}
                                className="bg-white/5 border-white/10 text-white"
                              />
                              <Textarea
                                value={stage.description}
                                onChange={(e) => updateStage(stage.id, { description: e.target.value })}
                                placeholder="Stage description (optional)"
                                className="bg-white/5 border-white/10 text-white"
                                rows={2}
                              />
                            </div>

                            <Button
                              type="button"
                              variant="ghost"
                              onClick={() => removeStage(stage.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </Card>
                        
                        {index < stages.length - 1 && (
                          <div className="flex justify-center my-2">
                            <ArrowRight className="w-6 h-6 text-neon-cyan/50" />
                          </div>
                        )}
                      </motion.div>
                    )}
                  </Draggable>
                ))}
              </AnimatePresence>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {stages.length === 0 && (
        <div className="text-center py-8 text-white/60">
          No stages added yet. Click "Add Stage" to create your first workflow stage.
        </div>
      )}
    </div>
  );
};