import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTags } from "@/components/hooks/useTags";
import { useImages } from "@/components/hooks/useImages";
import { useSavePost } from "@/components/hooks/useSavePost";
import { Tag } from "@/components/PostEditor/component/Tag";
import { Thumbnail } from "@/components/PostEditor/component/thumbnail";

const PostEditor = () => {
  const { tags, currentTag, addTag, removeTag, setCurrentTag } = useTags();
  const { images, uploadImage, deleteImage } = useImages();
  const { savePost, title, setTitle, slug, setSlug, content, setContent } = useSavePost();

  return (
    <div className="min-h-screen bg-[#1a1a1a] py-8">
      <div className="container mx-auto p-6">
        <Card className="p-8 space-y-6 glass border border-[#8000ff] shadow-[0_0_15px_rgba(128,0,255,0.3)]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white hover:bg-gradient-to-r hover:from-[#41f0db] hover:to-[#ff0abe] hover:bg-clip-text hover:text-transparent transition-all duration-300 letter-hover">
              Create New Post
            </h2>
            <Button 
              onClick={savePost} 
              className="py-2 bg-gradient-to-r from-[#8000ff] to-[#ff0abe] hover:opacity-90 transition-all duration-300 shadow-lg"
            >
              Save Post
            </Button>
          </div>

          <div className="space-y-6">
            <Input
              id="title"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-[35%] bg-black/40 border-[#8000ff]/30 focus:border-[#8000ff] transition-all duration-300"
            />
            <Input
              id="slug"
              placeholder="post-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-[35%] bg-black/40 border-[#8000ff]/30 focus:border-[#8000ff] transition-all duration-300"
            />

            <div>
              <div className="flex gap-2 mb-2">
                {tags.map((tag, index) => (
                  <Tag key={index} tag={tag} onRemove={removeTag} />
                ))}
              </div>
              <Input
                placeholder="Add tags (press Enter)"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={(e) => addTag(e)}
                className="w-[35%] bg-black/40 border-[#8000ff]/30 focus:border-[#8000ff] transition-all duration-300"
              />
            </div>

            <Textarea
              id="content"
              placeholder="Write your post content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-[200px] bg-black/40 border-[#8000ff]/30 focus:border-[#8000ff] transition-all duration-300"
            />

            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-[18%]">
                <Button 
                  className="w-full py-2 bg-gradient-to-r from-[#8000ff] to-[#ff0abe] hover:opacity-90 transition-all duration-300 shadow-lg" 
                  asChild
                >
                  <label htmlFor="image-upload">
                    Upload Img
                    <input
                      id="image-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => uploadImage(e)}
                      className="hidden"
                    />
                  </label>
                </Button>
              </div>

              <div className="w-full h-[25vh] border border-dashed border-[#8000ff]/30 rounded-lg flex items-center justify-center text-white/50 bg-black/20 backdrop-blur-sm">
                Drop Images Here or Use Upload Button
              </div>

              <div className="grid grid-cols-4 gap-2 w-full">
                {images.map((file, index) => (
                  <Thumbnail key={index} file={file} onDelete={() => deleteImage(index)} />
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PostEditor;