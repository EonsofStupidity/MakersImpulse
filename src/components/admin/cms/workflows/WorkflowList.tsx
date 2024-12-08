import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Play } from 'lucide-react';
import { useCMS } from '../core/CMSProvider';
import { WorkflowEditor } from '@/pages/admin/core/sort/csv/workflow/WorkflowEditor';
import { WorkflowProgress } from '@/pages/admin/core/workflows/WorkflowProgress';
import { WorkflowMonitoring } from '@/pages/admin/core/workflows/WorkflowMonitoring';

export const WorkflowList = () => {
  const { workflows, isLoading } = useCMS();

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4 h-24" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Workflows</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Workflow
        </Button>
      </div>

      <div className="grid gap-4">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{workflow.name}</h3>
                {workflow.description && (
                  <p className="text-sm text-muted-foreground">
                    {workflow.description}
                  </p>
                )}
              </div>
              <Button variant="ghost" size="icon">
                <Play className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};