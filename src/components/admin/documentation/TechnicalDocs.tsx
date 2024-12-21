import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeSystemDocs } from "./sections/ThemeSystemDocs";
import { DatabaseSchemaDocs } from "./sections/DatabaseSchemaDocs";
import { WorkflowsDocs } from "./sections/WorkflowsDocs";
import { TechnicalConfigDocs } from "./sections/TechnicalConfigDocs";
import { Card } from "@/components/ui/card";

export const TechnicalDocs = () => {
  return (
    <Card className="p-6 bg-gray-800/50 border border-white/10 backdrop-blur-sm">
      <Tabs defaultValue="theme-system" className="space-y-4">
        <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <TabsTrigger value="theme-system">Theme System</TabsTrigger>
          <TabsTrigger value="database">Database Schema</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="technical">Technical Config</TabsTrigger>
        </TabsList>

        <TabsContent value="theme-system" className="space-y-4">
          <ThemeSystemDocs />
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <DatabaseSchemaDocs />
        </TabsContent>

        <TabsContent value="workflows" className="space-y-4">
          <WorkflowsDocs />
        </TabsContent>

        <TabsContent value="technical" className="space-y-4">
          <TechnicalConfigDocs />
        </TabsContent>
      </Tabs>
    </Card>
  );
};