import React, { useState } from "react";
import { supabase } from "../../utils/supabase";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const PostEditor = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const { toast } = useToast();

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = async () => {
    try {
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
        tags,
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
        setTitle("");
        setSlug("");
        setContent("");
        setTags([]);
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#1a1a1a] relative overflow-hidden py-8"
    >
      {/* Background patterns */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1a1a15] to-[#1a1a1a]" />
      </div>

      <div className="container mx-auto p-6 relative z-10">
        <Card className="p-8 space-y-6 bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_15px_rgba(65,240,219,0.1)]">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#41f0db] to-[#ff0abe] bg-clip-text text-transparent">
            Create New Post
          </h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-[#41f0db] text-sm font-medium mb-2">
                Title
              </label>
              <Input
                id="title"
                type="text"
                placeholder="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-black/30 border-white/10 focus:border-[#ff0abe] text-white"
              />
            </div>
            
            <div>
              <label htmlFor="slug" className="block text-[#41f0db] text-sm font-medium mb-2">
                Slug
              </label>
              <Input
                id="slug"
                type="text"
                placeholder="post-slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="bg-black/30 border-white/10 focus:border-[#ff0abe] text-white"
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-[#41f0db] text-sm font-medium mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#41f0db]/10 text-[#41f0db] border border-[#41f0db]/20"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 hover:text-[#ff0abe]"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <Input
                type="text"
                placeholder="Add tags (press Enter)"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleAddTag}
                className="bg-black/30 border-white/10 focus:border-[#ff0abe] text-white"
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block text-[#41f0db] text-sm font-medium mb-2">
                Content
              </label>
              <Textarea
                id="content"
                placeholder="Write your post content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px] bg-black/30 border-white/10 focus:border-[#ff0abe] text-white"
              />
            </div>

            <Button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-[#41f0db]/20 to-[#ff0abe]/20 hover:from-[#41f0db]/30 hover:to-[#ff0abe]/30 text-white border border-white/10 backdrop-blur-xl"
            >
              Save Post
            </Button>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default PostEditor;