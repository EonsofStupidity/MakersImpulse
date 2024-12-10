import React from 'react';
import { AdminNav } from "@/components/admin/dashboard/AdminNav";
import { AdminSidebar } from "@/components/admin/dashboard/sidebar/AdminSidebar";
import { WorkflowManagement } from "@/components/admin/workflows/WorkflowManagement";
import { ContentManager } from "@/components/content/cms/ContentManager";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { FileText, GitBranch, History } from "lucide-react";

const AdminDashboard = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div 
      className="admin-layout"
      onMouseMove={handleMouseMove}
      style={{
        backgroundImage: `url('/lovable-uploads/293dada8-67ab-4da3-8f66-2f83623340b5.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <AdminSidebar />
      <AdminNav />
      
      <div 
        className="admin-gradient-bg" 
        style={{
          '--mouse-x': `${mousePosition.x}%`,
          '--mouse-y': `${mousePosition.y}%`
        } as React.CSSProperties} 
      />
      
      <main className="pl-64 pt-[3.7rem]">
        <div className="p-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="glass-card">
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="w-full bg-black/50 border-b border-white/10 p-1">
                  <TabsTrigger 
                    value="content" 
                    className="data-[state=active]:bg-[#b0e653]/10 data-[state=active]:text-[#b0e653]"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Content
                  </TabsTrigger>
                  <TabsTrigger 
                    value="workflows" 
                    className="data-[state=active]:bg-[#b0e653]/10 data-[state=active]:text-[#b0e653]"
                  >
                    <GitBranch className="w-4 h-4 mr-2" />
                    Workflows
                  </TabsTrigger>
                  <TabsTrigger 
                    value="history" 
                    className="data-[state=active]:bg-[#b0e653]/10 data-[state=active]:text-[#b0e653]"
                  >
                    <History className="w-4 h-4 mr-2" />
                    History
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="p-6">
                  <ContentManager />
                </TabsContent>

                <TabsContent value="workflows" className="p-6">
                  <WorkflowManagement />
                </TabsContent>

                <TabsContent value="history" className="p-6">
                  <div className="text-white/60 text-center py-8">
                    Revision history viewer will be implemented here
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;