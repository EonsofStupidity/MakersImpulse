import React from 'react';
import { ApprovalConfig } from './config/ApprovalConfig';
import { ReviewConfig } from './config/ReviewConfig';
import { TaskConfig } from './config/TaskConfig';
import { NotificationConfig } from './config/NotificationConfig';
import type { WorkflowStage, WorkflowStageConfig } from '../../types';

interface StageConfigPanelProps {
  stage: WorkflowStage;
  onUpdate: (stageId: string, updates: Partial<WorkflowStage>) => void;
}

export const StageConfigPanel = ({ stage, onUpdate }: StageConfigPanelProps) => {
  const handleConfigChange = (config: WorkflowStageConfig) => {
    onUpdate(stage.id, { config });
  };

  const renderConfig = () => {
    switch (stage.type) {
      case 'approval':
        return <ApprovalConfig config={stage.config} onChange={handleConfigChange} />;
      case 'review':
        return <ReviewConfig config={stage.config} onChange={handleConfigChange} />;
      case 'task':
        return <TaskConfig config={stage.config} onChange={handleConfigChange} />;
      case 'notification':
        return <NotificationConfig config={stage.config} onChange={handleConfigChange} />;
      case 'conditional':
        // Conditional config will be implemented later
        return <div className="text-white/60">Conditional configuration coming soon</div>;
      default:
        return null;
    }
  };

  return (
    <div className="mt-4 border-t border-white/10 pt-4">
      <h4 className="text-sm font-medium text-white mb-4">Stage Configuration</h4>
      {renderConfig()}
    </div>
  );
};