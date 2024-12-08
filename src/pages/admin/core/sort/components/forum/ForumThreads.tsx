import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MessageSquare } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import RichTextEditor from "@/components/ui/rich-text-editor";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@supabase/auth-helpers-react";

const ForumThreads = () => {
  const navigate = useNavigate();
  const session = useSession();
  const { toast } = useToast();
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [newThreadContent, setNewThreadContent] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { data: threads, isLoading } = useQuery({
    queryKey: ["forum-threads"],
    queryFn: async () => {
      const { data: threadsData, error: threadsError } = await supabase
        .from("forum_threads")
        .select(`
          *,
          category:forum_categories(name),
          author:profiles(username)
        `)
        .order("created_at", { ascending: false })
        .limit(10);
      
      if (threadsError) throw threadsError;

      // Fetch reply counts for each thread
      const threadIds = threadsData?.map(thread => thread.id) || [];
      const replyCounts = await Promise.all(
        threadIds.map(async (threadId) => {
          const { count, error } = await supabase
            .from("forum_replies")
            .select('*', { count: 'exact', head: true })
            .eq('thread_id', threadId);
          
          if (error) throw error;
          return { thread_id: threadId, count: count || 0 };
        })
      );

      // Combine thread data with reply counts
      const threadsWithCounts = threadsData?.map(thread => ({
        ...thread,
        reply_count: replyCounts.find(rc => rc.thread_id === thread.id)?.count || 0
      }));

      return threadsWithCounts;
    },
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const createThread = async () => {
    if (!session?.user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to create a thread",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from("forum_threads")
        .insert({
          title: newThreadTitle,
          content: newThreadContent,
          author_id: session.user.id,
          category_id: "default", // You might want to add category selection
          slug: generateSlug(newThreadTitle),
        })
        .select()
        .single();

      if (error) throw error;

      setIsDialogOpen(false);
      setNewThreadTitle("");
      setNewThreadContent("");
      navigate(`/forum/thread/${data.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create thread",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Recent Threads</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              New Thread
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[725px]">
            <DialogHeader>
              <DialogTitle>Create New Thread</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Thread Title"
                value={newThreadTitle}
                onChange={(e) => setNewThreadTitle(e.target.value)}
              />
              <RichTextEditor
                content={newThreadContent}
                onChange={setNewThreadContent}
                className="min-h-[200px]"
              />
              <Button onClick={createThread} className="w-full">
                Create Thread
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {threads?.map((thread) => (
          <Card
            key={thread.id}
            className="p-6 hover:bg-accent transition-colors cursor-pointer"
            onClick={() => navigate(`/forum/thread/${thread.id}`)}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">{thread.title}</h3>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>Posted by {thread.author?.username || "Unknown"}</span>
                  <span>•</span>
                  <span>in {thread.category?.name}</span>
                  <span>•</span>
                  <span>{new Date(thread.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm">{thread.reply_count}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ForumThreads;