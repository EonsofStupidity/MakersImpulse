import React from 'react';
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { WorkflowStageConfig } from '../../../types';

interface ReviewConfigProps {
  config: WorkflowStageConfig;
  onChange: (config: WorkflowStageConfig) => void;
}

export const ReviewConfig = ({ config, onChange }: ReviewConfigProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-white/70 mb-2">Time Limit (hours)</label>
        <Input
          type="number"
          min={0}
          value={config.timeLimit || 48}
          onChange={(e) => onChange({ ...config, timeLimit: parseInt(e.target.value) })}
          className="bg-white/5 border-white/10 text-white"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm text-white/70">Auto Assignment</label>
        <div className="flex items-center gap-2">
          <select
            value={config.autoAssignment?.type || 'user'}
            onChange={(e) => 
              onChange({
                ...config,
                autoAssignment: {
                  ...config.autoAssignment,
                  type: e.target.value as 'user' | 'role' | 'group'
                }
              })
            }
            className="bg-white/5 border-white/10 text-white rounded px-3 py-2 w-full"
          >
            <option value="user">User</option>
            <option value="role">Role</option>
            <option value="group">Group</option>
          </select>
        </div>
      </div>
    </div>
  );
};