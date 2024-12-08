import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";

const ProfileMessages = () => {
  const session = useSession();

  const { data: messages } = useQuery({
    queryKey: ["user-messages", session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("direct_messages")
        .select(`
          *,
          sender:profiles!direct_messages_sender_id_fkey(username),
          recipient:profiles!direct_messages_recipient_id_fkey(username)
        `)
        .or(`sender_id.eq.${session?.user?.id},recipient_id.eq.${session?.user?.id}`)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Recent Messages</h3>
      <ScrollArea className="h-[400px]">
        {messages?.map((message) => (
          <Card key={message.id} className="p-4 mb-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">
                  {message.sender_id === session?.user?.id
                    ? `To: ${message.recipient.username}`
                    : `From: ${message.sender.username}`}
                </p>
                <p className="text-sm mt-1">{message.content}</p>
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(message.created_at).toLocaleDateString()}
              </span>
            </div>
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
};

export default ProfileMessages;