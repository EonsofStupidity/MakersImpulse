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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
    if (droppedFiles.length > 0) {
      const event = { target: { files: droppedFiles } } as unknown as React.ChangeEvent<HTMLInputElement>;
      uploadImage(event);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] py-8">
      <div className="container mx-auto p-6">
        <Card className="p-8 space-y-6 bg-black/40 border border-white/10 relative">
          <Button 
            onClick={savePost} 
            className="absolute top-4 right-4"
          >
            Save Post
          </Button>

          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#41f0db] to-[#ff0abe] bg-clip-text text-transparent">
            Create New Post
          </h2>

          <div className="space-y-6">
            <Input
              id="title"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-[42%]"
            />
            <Input
              id="slug"
              placeholder="post-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-[42%]"
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
                onKeyDown={addTag}
                className="w-[42%]"
              />
            </div>

            <Textarea
              id="content"
              placeholder="Write your post content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-[75%]"
            />

            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Button
                  variant="outline"
                  className="w-[140px]"
                >
                  Upload Image
                  <input
                    id="image-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={uploadImage}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </Button>
              </div>

              <div 
                className="w-full h-[25vh] border border-dashed border-white/20 rounded-lg flex items-center justify-center text-white/50"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                Drop Images Here or Use Upload Button
              </div>

              <div className="grid grid-cols-4 gap-4 w-full">
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