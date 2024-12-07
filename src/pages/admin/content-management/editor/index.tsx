import React, { useState } from "react";
import { AdminNav } from "@/components/admin/dashboard/AdminNav";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadZone } from "@/components/uploads";
import { supabase } from "@/utils/supabase";
import { toast } from "sonner";

const PostEditor = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const handleSave = async () => {
    if (!title || !content) {
      toast.error("Please fill in all required fields");
      return;
    }

    const { data, error } = await supabase.from("blog_posts").insert({
      title,
      slug: slug || title.toLowerCase().replace(/ /g, "-"),
      content,
      status: 'draft'
    });

    if (error) {
      toast.error("Error saving post");
      console.error("Error saving post:", error);
    } else {
      toast.success("Post saved successfully");
      setTitle("");
      setSlug("");
      setContent("");
      setImages([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-20 p-8">
      <AdminNav />
      <div className="container mx-auto">
        <Card className="glass border-white/10 p-6 bg-black/40 backdrop-blur-xl shadow-[0_0_15px_rgba(65,240,219,0.2)] animate-fade-in">
          <h1 className="text-3xl font-bold text-white mb-8">Create New Post</h1>
          
          <div className="space-y-6">
            <div>
              <label className="text-white/80 block mb-2">Title</label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-white/5 border-white/10 text-white focus:border-[#41f0db] focus:ring-[#41f0db]/20 transition-all duration-300"
                placeholder="Enter post title"
              />
            </div>

            <div>
              <label className="text-white/80 block mb-2">Slug (optional)</label>
              <Input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="bg-white/5 border-white/10 text-white focus:border-[#41f0db] focus:ring-[#41f0db]/20 transition-all duration-300"
                placeholder="Enter URL slug"
              />
            </div>

            <div>
              <label className="text-white/80 block mb-2">Content</label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="bg-white/5 border-white/10 text-white min-h-[300px] focus:border-[#41f0db] focus:ring-[#41f0db]/20 transition-all duration-300"
                placeholder="Write your post content here..."
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setTitle("");
                  setSlug("");
                  setContent("");
                  setImages([]);
                }}
                className="border-white/10 text-white hover:bg-white/5 hover:border-[#41f0db] transition-all duration-300"
              >
                Clear
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-[#41f0db]/20 backdrop-blur-sm text-white border border-[#41f0db]/50 hover:bg-[#41f0db]/30 hover:border-[#41f0db] transition-all duration-300 shadow-[0_0_10px_rgba(65,240,219,0.3)]"
              >
                Save Post
              </Button>
            </div>

            <ImageUploadZone 
              images={images} 
              onImagesChange={setImages} 
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PostEditor;