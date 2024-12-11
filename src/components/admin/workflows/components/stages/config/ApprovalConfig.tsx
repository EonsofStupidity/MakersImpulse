import React from 'react';
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { WorkflowStageConfig } from '../../../types';

interface ApprovalConfigProps {
  config: WorkflowStageConfig;
  onChange: (config: WorkflowStageConfig) => void;
}

export const ApprovalConfig = ({ config, onChange }: ApprovalConfigProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-white/70 mb-2">Required Approvers</label>
        <Input
          type="number"
          min={1}
          value={config.requiredApprovers || 1}
          onChange={(e) => onChange({ ...config, requiredApprovers: parseInt(e.target.value) })}
          className="bg-white/5 border-white/10 text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-white/70 mb-2">Time Limit (hours)</label>
        <Input
          type="number"
          min={0}
          value={config.timeLimit || 24}
          onChange={(e) => onChange({ ...config, timeLimit: parseInt(e.target.value) })}
          className="bg-white/5 border-white/10 text-white"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm text-white/70">Notifications</label>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={config.notifications?.onStart || false}
              onCheckedChange={(checked) => 
                onChange({ 
                  ...config, 
                  notifications: { 
                    ...config.notifications, 
                    onStart: checked 
                  } 
                })
              }
            />
            <span className="text-sm text-white">Notify on start</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={config.notifications?.onComplete || false}
              onCheckedChange={(checked) => 
                onChange({ 
                  ...config, 
                  notifications: { 
                    ...config.notifications, 
                    onComplete: checked 
                  } 
                })
              }
            />
            <span className="text-sm text-white">Notify on complete</span>
          </div>
        </div>
      </div>
    </div>
  );
};