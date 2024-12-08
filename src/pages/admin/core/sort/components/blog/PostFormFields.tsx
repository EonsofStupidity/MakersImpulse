import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CategorySelect } from "@/components/blog/category/CategorySelect";
import { TagSelector } from "@/components/common/form/TagSelector";
import { ImageUpload } from "@/components/common/form/ImageUpload";

interface PostFormFieldsProps {
  title: string;
  setTitle: (value: string) => void;
  excerpt: string;
  setExcerpt: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  selectedTags: string[];
  onTagsChange: (value: string[]) => void;
  featuredImage: string | null;
  onFeaturedImageChange: (value: string | null) => void;
}

export const PostFormFields = ({
  title,
  setTitle,
  excerpt,
  setExcerpt,
  category,
  setCategory,
  selectedTags,
  onTagsChange,
  featuredImage,
  onFeaturedImageChange,
}: PostFormFieldsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Brief description of the post"
        />
      </div>

      <div className="space-y-2">
        <Label>Category</Label>
        <CategorySelect
          selectedId={category}
          onSelect={setCategory}
        />
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <TagSelector
          selectedTags={selectedTags}
          onChange={onTagsChange}
          maxTags={5}
        />
      </div>

      <div className="space-y-2">
        <Label>Featured Image</Label>
        <ImageUpload
          value={featuredImage}
          onChange={onFeaturedImageChange}
          allowPlaceholders
        />
      </div>
    </div>
  );
};
