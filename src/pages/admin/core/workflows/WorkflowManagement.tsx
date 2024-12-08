import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WorkflowList } from "./WorkflowList";
import { StepTypeDefinitions } from "./StepTypeDefinitions";
import { WorkflowProgress } from "./WorkflowProgress";
import { WorkflowMonitoring } from "./WorkflowMonitoring";

export const WorkflowManagement = () => {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Workflow Management</h2>
        <p className="text-muted-foreground">
          Manage and monitor your workflow templates and instances
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="list">Workflows</TabsTrigger>
          <TabsTrigger value="steps">Step Types</TabsTrigger>
          <TabsTrigger value="instances">Active Instances</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-6">
          <WorkflowList />
        </TabsContent>

        <TabsContent value="steps" className="mt-6">
          <StepTypeDefinitions />
        </TabsContent>

        <TabsContent value="instances" className="mt-6">
          <WorkflowProgress
            instance={{
              id: "1",
              status: "active",
              current_step: "step1",
              started_at: new Date().toISOString(),
              data: {},
            }}
          />
        </TabsContent>

        <TabsContent value="monitoring" className="mt-6">
          <WorkflowMonitoring />
        </TabsContent>
      </Tabs>
    </div>
  );
};