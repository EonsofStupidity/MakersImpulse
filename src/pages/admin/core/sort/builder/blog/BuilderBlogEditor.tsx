import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import BuilderBlogRevisions from "./BuilderBlogRevisions";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface BuilderBlogEditorProps {
  post?: any;
  onClose: () => void;
}

const BuilderBlogEditor = ({ post, onClose }: BuilderBlogEditorProps) => {
  const [title, setTitle] = useState(post?.title || "");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const editor = useEditor({
    extensions: [StarterKit],
    content: post?.content || "",
  });

  const saveMutation = useMutation({
    mutationFn: async (data: { title: string; content: string; status: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      if (post?.id) {
        const { error } = await supabase
          .from("builder_blog_posts")
          .update({
            title: data.title,
            content: data.content,
            status: data.status,
            updated_at: new Date().toISOString(),
            published_at: data.status === "published" ? new Date().toISOString() : post.published_at,
          })
          .eq("id", post.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("builder_blog_posts")
          .insert({
            title: data.title,
            content: data.content,
            status: data.status,
            slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            builder_id: user.id,
          });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["builder-blog-posts"] });
      toast({
        title: "Success",
        description: `Post ${post?.id ? "updated" : "created"} successfully`,
      });
      onClose();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  const handleSave = (status: string) => {
    if (!editor || !title) return;
    
    saveMutation.mutate({
      title,
      content: editor.getHTML(),
      status,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {post?.id ? "Edit Post" : "New Post"}
        </h2>
        <Button variant="ghost" onClick={onClose}>
          ← Back to List
        </Button>
      </div>

      <Tabs defaultValue="edit">
        <TabsList>
          <TabsTrigger value="edit">Edit</TabsTrigger>
          {post?.id && <TabsTrigger value="revisions">Revisions</TabsTrigger>}
        </TabsList>

        <TabsContent value="edit">
          <Card className="p-4 space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
              />
            </div>

            <div>
              <Label>Content</Label>
              <Card className="mt-2 p-4">
                <EditorContent editor={editor} />
              </Card>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => handleSave("draft")}
                disabled={saveMutation.isPending}
              >
                Save as Draft
              </Button>
              <Button
                onClick={() => handleSave("published")}
                disabled={saveMutation.isPending}
              >
                Publish
              </Button>
            </div>
          </Card>
        </TabsContent>

        {post?.id && (
          <TabsContent value="revisions">
            <BuilderBlogRevisions postId={post.id} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default BuilderBlogEditor;