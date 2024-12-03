import React, { useState } from "react";
import { supabase } from "../../utils/supabase";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const PostEditor = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      // Get the current user's session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user?.id) {
        toast({
          title: "Error",
          description: "You must be logged in to create a post",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase.from("posts").insert({
        title,
        slug,
        content,
        is_published: true,
        author_id: session.user.id,
        published_at: new Date().toISOString()
      });

      if (error) {
        toast({
          title: "Error saving post",
          description: error.message,
          variant: "destructive"
        });
        console.error("Error saving post:", error);
      } else {
        toast({
          title: "Success",
          description: "Post saved successfully"
        });
        // Clear the form
        setTitle("");
        setSlug("");
        setContent("");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Create/Edit Post</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <Input
              id="title"
              type="text"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="slug" className="block text-sm font-medium mb-1">
              Slug
            </label>
            <Input
              id="slug"
              type="text"
              placeholder="post-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-1">
              Content
            </label>
            <Textarea
              id="content"
              placeholder="Write your post content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px]"
            />
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Post
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PostEditor;