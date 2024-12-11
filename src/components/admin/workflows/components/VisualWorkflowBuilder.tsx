import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ArrowRight } from 'lucide-react';
import type { WorkflowStage } from '../types';

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

      <div className="relative">
        {stages.map((stage, index) => (
          <React.Fragment key={stage.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <Card className="p-4 bg-white/5 border-white/10 hover:border-neon-cyan/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-neon-cyan/20 flex items-center justify-center border border-neon-cyan/50">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{stage.name || 'Unnamed Stage'}</h4>
                    {stage.description && (
                      <p className="text-sm text-white/60">{stage.description}</p>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
            {index < stages.length - 1 && (
              <div className="flex justify-center my-2">
                <ArrowRight className="w-6 h-6 text-neon-cyan/50" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};