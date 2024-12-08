import { useSession } from "@supabase/auth-helpers-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileGeneral from "@/components/profile/ProfileGeneral";
import ProfileForumActivity from "@/components/profile/ProfileForumActivity";
import ProfileMessages from "@/components/profile/ProfileMessages";
import ProfileNotifications from "@/components/profile/ProfileNotifications";

const ProfileSettings = () => {
  const session = useSession();

  if (!session) return null;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
      
      <Card className="p-6">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid grid-cols-4 gap-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="forum">Forum Activity</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <ProfileGeneral />
          </TabsContent>

          <TabsContent value="forum">
            <ProfileForumActivity />
          </TabsContent>

          <TabsContent value="messages">
            <ProfileMessages />
          </TabsContent>

          <TabsContent value="notifications">
            <ProfileNotifications />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default ProfileSettings;