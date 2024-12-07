import React, { useState } from "react";
import { AdminNav } from "@/components/admin/dashboard/AdminNav";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageUploadZone } from "@/components/uploads";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import RichTextEditor from "@/components/content/blog/components/RichTextEditor";
import { Database } from "@/integrations/supabase/types";

type PostCategory = Database["public"]["Enums"]["post_category"];

const PostEditor = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [category, setCategory] = useState<PostCategory | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  const handleSave = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("You must be logged in to create posts");
        return;
      }

      if (!title || !content) {
        toast.error("Please fill in all required fields");
        return;
      }

      if (!category) {
        toast.error("Please select a category");
        return;
      }

      // Upload images first
      const uploadedImageUrls = await Promise.all(
        images.map(async (file) => {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `uploads/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('media')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data } = supabase.storage
            .from('media')
            .getPublicUrl(filePath);

          return data.publicUrl;
        })
      );

      // Create the blog post
      const { data: post, error: postError } = await supabase
        .from("blog_posts")
        .insert({
          title,
          slug: slug || title.toLowerCase().replace(/ /g, "-"),
          content,
          rich_content: content,
          status: 'draft',
          author_id: user.id,
          images: uploadedImageUrls,
          category,
          tags
        })
        .select()
        .single();

      if (postError) throw postError;

      // Associate images with the post
      if (post && uploadedImageUrls.length > 0) {
        const { error: mediaError } = await supabase
          .from('media')
          .insert(
            uploadedImageUrls.map(url => ({
              name: url.split('/').pop() || '',
              url,
              blog_post_id: post.id,
              user_id: user.id
            }))
          );

        if (mediaError) throw mediaError;
      }

      toast.success("Post saved successfully");
      setTitle("");
      setSlug("");
      setContent("");
      setImages([]);
      setCategory(null);
      setTags([]);
    } catch (error) {
      console.error("Error in handleSave:", error);
      toast.error("An unexpected error occurred");
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
              <RichTextEditor 
                content={content}
                onChange={setContent}
                onCategoryChange={(cat) => setCategory(cat as PostCategory)}
                onTagsChange={setTags}
              />
            </div>

            <ImageUploadZone 
              images={images} 
              onImagesChange={setImages} 
            />

            <div className="flex justify-end gap-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setTitle("");
                  setSlug("");
                  setContent("");
                  setImages([]);
                  setCategory(null);
                  setTags([]);
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
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PostEditor;