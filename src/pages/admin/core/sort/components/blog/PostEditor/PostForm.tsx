import { Editor } from "./Editor";
import { MetadataForm } from "./MetadataForm";
import { CategorySelect } from "@/components/blog/category/CategorySelect";
import { TagSelector } from "@/components/common/form/TagSelector";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface PostFormProps {
  data: any;
  onChange: (data: any) => void;
  onSubmit?: () => void;
}

export const PostForm = ({ data, onChange, onSubmit }: PostFormProps) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Tabs defaultValue="content">
      <TabsList>
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="metadata">Metadata</TabsTrigger>
      </TabsList>

      <TabsContent value="content" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Enter post title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            value={data.excerpt}
            onChange={(e) => handleChange("excerpt", e.target.value)}
            placeholder="Brief description of the post"
          />
        </div>

        <div className="space-y-2">
          <Label>Content</Label>
          <Card className="p-4">
            <Editor
              initialContent={data.content}
              onChange={(content) => handleChange("content", content)}
            />
          </Card>
        </div>

        <div className="space-y-2">
          <CategorySelect
            selectedId={data.category_id}
            onSelect={(value) => handleChange("category_id", value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Tags</Label>
          <TagSelector
            selectedTags={data.tags}
            onChange={(tags) => handleChange("tags", tags)}
          />
        </div>

        <div className="fixed bottom-4 right-4 left-4 md:static md:flex md:justify-end">
          <Button 
            className="w-full md:w-auto" 
            onClick={onSubmit}
            size="lg"
          >
            Publish Post
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="metadata">
        <MetadataForm
          data={data}
          onChange={onChange}
        />
      </TabsContent>
    </Tabs>
  );
};