import { Outlet } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Settings, Users, Shield, Activity, Workflow } from "lucide-react";

interface CoreLayoutProps {
  children?: React.ReactNode;
}

const CoreLayout = ({ children }: CoreLayoutProps) => {
  return (
    <div className="space-y-6">
      <div className="border-b">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Monitoring
            </TabsTrigger>
            <TabsTrigger value="workflows" className="flex items-center gap-2">
              <Workflow className="w-4 h-4" />
              Workflows
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="container mx-auto">
        {children || <Outlet />}
      </div>
    </div>
  );
};

export default CoreLayout;