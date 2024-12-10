import React from 'react';
import { AdminNav } from "@/components/admin/dashboard/AdminNav";
import { WorkflowManagement } from "@/components/admin/workflows/WorkflowManagement";
import { ContentManager } from "@/components/content/cms/ContentManager";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { FileText, GitBranch, History } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-20">
      <AdminNav />
      <div className="container mx-auto p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 bg-black/40 border-white/10">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="bg-white/5 border-white/10">
                <TabsTrigger value="content" className="data-[state=active]:bg-white/10">
                  <FileText className="w-4 h-4 mr-2" />
                  Content
                </TabsTrigger>
                <TabsTrigger value="workflows" className="data-[state=active]:bg-white/10">
                  <GitBranch className="w-4 h-4 mr-2" />
                  Workflows
                </TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-white/10">
                  <History className="w-4 h-4 mr-2" />
                  History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="mt-6">
                <ContentManager />
              </TabsContent>

              <TabsContent value="workflows" className="mt-6">
                <WorkflowManagement />
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <div className="text-white/60 text-center py-8">
                  Revision history viewer will be implemented here
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;