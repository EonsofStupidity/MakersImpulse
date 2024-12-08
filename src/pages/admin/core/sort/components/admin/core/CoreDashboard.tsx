import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Users, Shield } from "lucide-react";
import UserList from "./users/UserList";
import RoleList from "./roles/RoleList";
import AdminSettingsForm from "./settings/AdminSettingsForm";

const CoreDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Roles
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <UserList />
        </TabsContent>

        <TabsContent value="roles">
          <RoleList />
        </TabsContent>

        <TabsContent value="settings">
          <AdminSettingsForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CoreDashboard;