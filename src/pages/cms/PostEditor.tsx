import React, { useState } from "react";
import { supabase } from "../../utils/supabase";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import ImageUploadZone from "@/components/cms/ImageUploadZone";

// Tag Component
const Tag = ({ tag, onRemove }: { tag: string; onRemove: (tag: string) => void }) => (
  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#41f0db]/10 text-[#41f0db] border border-[#41f0db]/20">
    {tag}
    <button onClick={() => onRemove(tag)} className="ml-2 hover:text-[#ff0abe]">
      <X size={14} />
    </button>
  </span>
);

const PostEditor = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const { toast } = useToast();

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const validateForm = () => {
    const errors = [];

    if (!title.trim()) {
      errors.push("Title is required");
    }

    if (!slug.trim()) {
      errors.push("Post slug is required");
    }

    if (tags.length === 0) {
      errors.push("At least one tag is required");
    }

    if (content.length < 141) {
      errors.push("Content must be at least 141 characters");
    }

    return errors;
  };

  const handleSave = async () => {
    const errors = validateForm();
    
    if (errors.length > 0) {
      errors.forEach(error => {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: error,
        });
      });
      return;
    }

    // Save post logic
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#1a1a1a] relative overflow-hidden py-8"
    >
      <div className="container mx-auto p-6 relative z-10">
        <Card className="p-8 space-y-6 bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_15px_rgba(65,240,219,0.1)]">
          <h2 className="text-3xl font-bold text-white">
            Create New Post
          </h2>

          <div className="space-y-6">
            <div className="flex justify-end mb-4">
              <Button
                onClick={handleSave}
                className="w-[27%] py-2 bg-black/30 border border-white/10 text-white rounded-lg backdrop-blur-md hover:shadow-[0_0_12px_rgba(255,0,171,0.8)] transition-all hover:text-[#ff0abe]"
              >
                Save Post
              </Button>
            </div>

            <Input
              id="title"
              type="text"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-[35%] bg-black/30 border-white/10 focus:border-[#ff0abe] text-white"
            />

            <Input
              id="slug"
              type="text"
              placeholder="post-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-[35%] bg-black/30 border-white/10 focus:border-[#ff0abe] text-white"
            />

            <div>
              <div className="flex gap-2 mb-2">
                {tags.map((tag, index) => (
                  <Tag key={index} tag={tag} onRemove={handleRemoveTag} />
                ))}
              </div>
              <Input
                type="text"
                placeholder="Add tags (press Enter)"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleAddTag}
                className="w-[35%] bg-black/30 border-white/10 focus:border-[#ff0abe] text-white"
              />
            </div>

            <Textarea
              id="content"
              placeholder="Write your post content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px] bg-black/30 border-white/10 focus:border-[#ff0abe] text-white"
            />

            <ImageUploadZone 
              images={images}
              onImagesChange={setImages}
            />
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default PostEditor;