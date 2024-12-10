import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MessageSquare, Flag, Trash2, Edit } from 'lucide-react';

export const ForumManagement = () => {
  const { data: threads, isLoading } = useQuery({
    queryKey: ['forum-threads'],
    queryFn: async () => {
      console.log('Fetching forum threads...');
      const { data, error } = await supabase
        .from('forum_threads')
        .select(`
          *,
          author:profiles(display_name),
          replies:forum_replies(count)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching threads:', error);
        toast.error('Failed to load forum threads');
        throw error;
      }

      return data;
    }
  });

  const handleDeleteThread = async (threadId: string) => {
    try {
      const { error } = await supabase
        .from('forum_threads')
        .delete()
        .eq('id', threadId);

      if (error) throw error;
      toast.success('Thread deleted successfully');
    } catch (error) {
      console.error('Error deleting thread:', error);
      toast.error('Failed to delete thread');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Forum Management</h2>
        <div className="flex gap-4">
          <Input 
            placeholder="Search threads..." 
            className="w-64 bg-black/20 border-white/10"
          />
          <Button className="bg-neon-cyan/20 text-white border border-neon-cyan/50 hover:bg-neon-cyan/30">
            <MessageSquare className="w-4 h-4 mr-2" />
            New Thread
          </Button>
        </div>
      </div>

      <Card className="bg-black/40 border-white/10">
        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center p-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-cyan"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Replies</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {threads?.map((thread) => (
                  <TableRow key={thread.id}>
                    <TableCell className="font-medium">{thread.title}</TableCell>
                    <TableCell>{thread.author?.display_name || 'Unknown'}</TableCell>
                    <TableCell>{thread.replies?.[0]?.count || 0}</TableCell>
                    <TableCell>
                      {new Date(thread.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:text-neon-cyan"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:text-red-500"
                          onClick={() => handleDeleteThread(thread.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:text-yellow-500"
                        >
                          <Flag className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </Card>
    </div>
  );
};