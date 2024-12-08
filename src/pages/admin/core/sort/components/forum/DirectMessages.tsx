import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { MessageSquare, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import RichTextEditor from "@/components/ui/rich-text-editor";

const DirectMessages = () => {
  const session = useSession();
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const { data: conversations } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      if (!session?.user?.id) return [];
      
      const { data, error } = await supabase
        .from("direct_messages")
        .select(`
          id,
          content,
          created_at,
          sender:profiles!direct_messages_sender_id_fkey(id, username),
          recipient:profiles!direct_messages_recipient_id_fkey(id, username)
        `)
        .or(`sender_id.eq.${session.user.id},recipient_id.eq.${session.user.id}`)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const { data: messages, refetch: refetchMessages } = useQuery({
    queryKey: ["messages", selectedUser],
    queryFn: async () => {
      if (!session?.user?.id || !selectedUser) return [];

      const { data, error } = await supabase
        .from("direct_messages")
        .select("*")
        .or(`and(sender_id.eq.${session.user.id},recipient_id.eq.${selectedUser}),and(sender_id.eq.${selectedUser},recipient_id.eq.${session.user.id})`)
        .order("created_at");

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id && !!selectedUser,
  });

  useEffect(() => {
    const channel = supabase
      .channel("direct_messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "direct_messages",
          filter: `recipient_id=eq.${session?.user?.id}`,
        },
        () => {
          refetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session?.user?.id, refetchMessages]);

  const sendMessage = async () => {
    if (!session?.user?.id || !selectedUser || !newMessage.trim()) return;

    try {
      const { error } = await supabase.from("direct_messages").insert({
        sender_id: session.user.id,
        recipient_id: selectedUser,
        content: newMessage.trim(),
      });

      if (error) throw error;

      setNewMessage("");
      refetchMessages();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Conversations</h3>
        <ScrollArea className="h-[500px]">
          {conversations?.map((conversation) => {
            const otherUser = conversation.sender.id === session?.user?.id
              ? conversation.recipient
              : conversation.sender;

            return (
              <Button
                key={conversation.id}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setSelectedUser(otherUser.id)}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                {otherUser.username}
              </Button>
            );
          })}
        </ScrollArea>
      </Card>

      <Card className="p-4 md:col-span-2">
        {selectedUser ? (
          <div className="flex flex-col h-[500px]">
            <ScrollArea className="flex-1 mb-4">
              <div className="space-y-4">
                {messages?.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender_id === session?.user?.id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[70%] ${
                        message.sender_id === session?.user?.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex flex-col gap-2">
              <RichTextEditor
                content={newMessage}
                onChange={setNewMessage}
                className="min-h-[100px]"
              />
              <Button onClick={sendMessage} className="self-end">
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        ) : (
          <div className="h-[500px] flex items-center justify-center text-muted-foreground">
            Select a conversation to start messaging
          </div>
        )}
      </Card>
    </div>
  );
};

export default DirectMessages;
