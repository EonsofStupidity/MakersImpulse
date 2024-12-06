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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...uploadedFiles]);
    }
  };

  const handleImageDelete = (index: number) => {
    toast({
      title: "Warning!",
      description: "Are you absolutely sure you want to delete this image?",
      action: {
        label: "Yes",
        onClick: () => {
          setImages(images.filter((_, i) => i !== index));
        },
      },
    });
  };

  const handleSave = async () => {
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
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#41f0db] to-[#ff0abe] bg-clip-text text-transparent">
            Create New Post
          </h2>

          <div className="space-y-6">
            <Input
              id="title"
              type="text"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-black/30 border-white/10 focus:border-[#ff0abe] text-white"
            />

            <Input
              id="slug"
              type="text"
              placeholder="post-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="bg-black/30 border-white/10 focus:border-[#ff0abe] text-white"
            />

            <div>
              <div className="flex gap-2 mb-2">
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

            <Textarea
              id="content"
              placeholder="Write your post content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px] bg-black/30 border-white/10 focus:border-[#ff0abe] text-white"
            />

            {/* Image Upload Section */}
            <div className="space-y-4">
              <Button
                as="label"
                htmlFor="image-upload"
                className="w-full bg-gradient-to-r from-[#41f0db]/20 to-[#ff0abe]/20 hover:from-[#41f0db]/30 hover:to-[#ff0abe]/30 text-white"
              >
                Upload Img
                <input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </Button>

              <div className="border border-dashed border-[#41f0db] bg-black/30 p-4 rounded-lg">
                <div className="grid grid-cols-4 gap-2">
                  {images.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Thumbnail"
                        className="w-full h-full object-cover rounded"
                      />
                      <button
                        onClick={() => handleImageDelete(index)}
                        className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button onClick={handleSave} className="w-full bg-gradient-to-r from-[#41f0db]/20 to-[#ff0abe]/20 text-white">
              Save Post
            </Button>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default PostEditor;
