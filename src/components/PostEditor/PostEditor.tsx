import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTags } from "@/components/PostEditor/hooks/useTags";
import { useImages } from "@/components/PostEditor/hooks/useImages";
import { useSavePost } from "@/components/PostEditor/hooks/useSavePost";
import { Tag } from "@/components/PostEditor/components/Tag";
import { Thumbnail } from "@/components/PostEditor/components/Thumbnail";

const PostEditor = () => {
  const { tags, currentTag, addTag, removeTag, setCurrentTag } = useTags();
  const { images, uploadImage, deleteImage } = useImages();
  const { savePost, title, setTitle, slug, setSlug, content, setContent } = useSavePost();

  return (
    <div className="min-h-screen bg-[#1a1a1a] py-8">
      <div className="container mx-auto p-6">
        <Card className="p-8 space-y-6 bg-black/40 border border-white/10">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#41f0db] to-[#ff0abe] bg-clip-text text-transparent">
            Create New Post
          </h2>

          <div className="space-y-6">
            <Input
              id="title"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              id="slug"
              placeholder="post-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />

            {/* Tags Section */}
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
              />
            </div>

            {/* Content Section */}
            <Textarea
              id="content"
              placeholder="Write your post content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            {/* Image Upload Section */}
            <div className="flex flex-col items-center space-y-4">
              <Button
                as="label"
                htmlFor="image-upload"
                className="w-[22%] py-2"
              >
                Upload Img
                <input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => uploadImage(e)}
                  className="hidden"
                />
              </Button>

              <div className="w-[65%] h-[25vh] border border-dashed">
                Drop Images Here or Use Upload Button
              </div>

              <div className="grid grid-cols-4 gap-2 w-full">
                {images.map((file, index) => (
                  <Thumbnail key={index} file={file} onDelete={() => deleteImage(index)} />
                ))}
              </div>
            </div>

            {/* Save Button */}
            <Button onClick={savePost} className="w-[27%] py-2">
              Save Post
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PostEditor;
