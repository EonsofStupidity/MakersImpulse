import { Editor } from '@tiptap/react';
import { Button } from "@/components/ui/button";
import {
  Bold, Italic, Heading, Code, Image as ImageIcon
} from "lucide-react";

interface PostEditorToolbarProps {
  editor: Editor;
  onImageUpload: () => void;
}

export const PostEditorToolbar = ({ editor, onImageUpload }: PostEditorToolbarProps) => {
  return (
    <div className="border-b pb-4 mb-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          data-active={editor.isActive("bold")}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          data-active={editor.isActive("italic")}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          data-active={editor.isActive("heading")}
        >
          <Heading className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          data-active={editor.isActive("codeBlock")}
        >
          <Code className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onImageUpload}>
          <ImageIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};