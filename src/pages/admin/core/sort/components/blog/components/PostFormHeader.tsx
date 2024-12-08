import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CategorySelect } from "@/components/blog/category/CategorySelect";

interface PostFormHeaderProps {
  title: string;
  setTitle: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
}

export const PostFormHeader = ({ 
  title, 
  setTitle,
  category,
  setCategory
}: PostFormHeaderProps) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create New Post</h1>
      
      <div className="space-y-2">
        <Label htmlFor="title" className="text-xl">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          className="w-[60%]"
        />
      </div>

      <div className="space-y-2 w-[60%]">
        <Label>Category</Label>
        <div className="relative">
          <CategorySelect
            selectedId={category}
            onSelect={setCategory}
          />
        </div>
      </div>
    </div>
  );
};