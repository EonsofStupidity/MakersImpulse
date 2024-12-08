import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

const ForumManagement = () => {
  const { data: threads, isLoading: threadsLoading } = useQuery({
    queryKey: ["admin-threads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("forum_threads")
        .select(`
          *,
          author:profiles(username),
          category:forum_categories(name)
        `)
        .order("created_at", { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Forum Management</h2>
        <Tabs defaultValue="threads">
          <TabsList>
            <TabsTrigger value="threads">Threads</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="threads">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {threads?.map((thread) => (
                  <TableRow key={thread.id}>
                    <TableCell>{thread.title}</TableCell>
                    <TableCell>{thread.author?.username}</TableCell>
                    <TableCell>{thread.category?.name}</TableCell>
                    <TableCell>
                      <Badge variant={thread.is_locked ? "destructive" : "default"}>
                        {thread.is_locked ? "Locked" : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(thread.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default ForumManagement;