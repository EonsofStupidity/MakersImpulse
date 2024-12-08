import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useCMS } from '../core/CMSProvider';

export const ComponentRegistry = () => {
  const { components, isLoading } = useCMS();

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
        <h2 className="text-2xl font-bold">Component Registry</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Component
        </Button>
      </div>

      <div className="grid gap-4">
        {components.map((component) => (
          <Card key={component.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{component.name}</h3>
                {component.description && (
                  <p className="text-sm text-muted-foreground">
                    {component.description}
                  </p>
                )}
              </div>
              <Badge>{component.component_type}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};