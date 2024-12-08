import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";
import LayoutSelector from "./LayoutSelector";
import ContentPreview from "./ContentPreview";
import { EditorToolbar } from "@/components/common/editor/EditorToolbar";
import { handleImageUpload } from "./ImageUploadHandler";

interface ContentEditorProps {
  initialContent?: string;
  onSave: (content: { title: string; content: string; layout: string }) => void;
}

const ContentEditor = ({ initialContent = "", onSave }: ContentEditorProps) => {
  const [title, setTitle] = useState("");
  const [selectedLayout, setSelectedLayout] = useState("default");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full",
        },
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: "prose prose-sm dark:prose-invert max-w-none focus:outline-none",
      },
    },
  });

  const handleSave = () => {
    if (editor) {
      onSave({
        title,
        content: editor.getHTML(),
        layout: selectedLayout,
      });
    }
  };

  const addImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        setIsUploading(true);
        handleImageUpload(
          target.files[0],
          toast,
          (url) => {
            if (editor) {
              editor.chain().focus().setImage({ src: url }).run();
            }
            setIsUploading(false);
          },
          () => setIsUploading(false)
        );
      }
    };
    input.click();
  };

  if (!editor) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 mr-4">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter content title"
          />
        </div>
      </div>

      <Tabs defaultValue="edit">
        <TabsList>
          <TabsTrigger value="edit" onClick={() => setIsPreviewMode(false)}>
            Edit
          </TabsTrigger>
          <TabsTrigger value="preview" onClick={() => setIsPreviewMode(true)}>
            Preview
          </TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <Card className="p-4">
            <EditorToolbar 
              editor={editor} 
              onImageUpload={addImage}
              isUploading={isUploading}
            />
            <EditorContent editor={editor} />
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <ContentPreview content={editor.getHTML()} layout={selectedLayout} />
        </TabsContent>

        <TabsContent value="layout">
          <LayoutSelector
            selectedLayout={selectedLayout}
            onLayoutChange={setSelectedLayout}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentEditor;