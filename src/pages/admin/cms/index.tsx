import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CMSProvider } from '@/components/admin/cms/core/CMSProvider';
import { ContentList } from '@/components/admin/cms/content/ContentList';
import { ComponentRegistry } from '@/components/admin/cms/components/ComponentRegistry';
import { WorkflowList } from '@/components/admin/cms/workflows/WorkflowList';

const CMSDashboard = () => {
  return (
    <CMSProvider>
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8">Content Management</h1>
        
        <Tabs defaultValue="content" className="space-y-4">
          <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            <ContentList />
          </TabsContent>

          <TabsContent value="components" className="space-y-4">
            <ComponentRegistry />
          </TabsContent>

          <TabsContent value="workflows" className="space-y-4">
            <WorkflowList />
          </TabsContent>
        </Tabs>
      </div>
    </CMSProvider>
  );
};

export default CMSDashboard;