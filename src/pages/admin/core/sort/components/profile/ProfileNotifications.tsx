import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";

const ProfileNotifications = () => {
  const session = useSession();

  const { data: notifications } = useQuery({
    queryKey: ["user-notifications", session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", session?.user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="forum-notifications">Forum Notifications</Label>
            <Switch id="forum-notifications" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="message-notifications">Message Notifications</Label>
            <Switch id="message-notifications" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="mention-notifications">Mention Notifications</Label>
            <Switch id="mention-notifications" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Notifications</h3>
        <ScrollArea className="h-[300px]">
          {notifications?.map((notification) => (
            <Card key={notification.id} className="p-4 mb-2">
              <h4 className="font-medium">{notification.title}</h4>
              <p className="text-sm">{notification.message}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(notification.created_at).toLocaleDateString()}
              </p>
            </Card>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default ProfileNotifications;