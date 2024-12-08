import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImagePlus, Eye, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { EditorToolbar } from "@/components/common/editor/EditorToolbar";
import ContentPreview from "./ContentPreview";

export function ContentCreationForm() {
  const [title, setTitle] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full",
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[200px] p-4",
      },
    },
  });

  const createContent = useMutation({
    mutationFn: async (data: { title: string; content: string }) => {
      const { error } = await supabase
        .from("cms_content")
        .insert([{
          title: data.title,
          content: data.content,
          status: "draft",
          content_type: "article",
          slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        }]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms-content"] });
      toast({
        title: "Success",
        description: "Content created successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  const handleSave = () => {
    if (!editor || !title) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please provide a title and content",
      });
      return;
    }

    createContent.mutate({
      title,
      content: editor.getHTML(),
    });
  };

  const handleImageUpload = () => {
    const url = window.prompt("Enter image URL");
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Create New Content</h1>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
          >
            <Eye className="w-4 h-4 mr-2" />
            {isPreviewMode ? "Edit" : "Preview"}
          </Button>
          <Button onClick={handleSave} disabled={createContent.isPending}>
            <Save className="w-4 h-4 mr-2" />
            Save as Draft
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter content title"
              className="mt-1"
            />
          </div>

          {isPreviewMode ? (
            <ContentPreview
              title={title}
              content={editor?.getHTML() || ""}
            />
          ) : (
            <div className="space-y-4">
              <EditorToolbar editor={editor} onImageUpload={handleImageUpload} />
              <Card className="min-h-[400px]">
                <EditorContent editor={editor} />
              </Card>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}