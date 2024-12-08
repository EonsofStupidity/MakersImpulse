import { Editor } from '@tiptap/react';
import { Button } from "@/components/ui/button";
import {
  Bold, Italic, List, ImageIcon, Code,
  AlignLeft, AlignCenter, AlignRight, Heading
} from "lucide-react";

interface PostEditorToolbarProps {
  editor: Editor | null;
  onImageUpload: () => void;
  isUploading?: boolean;
}

export const PostEditorToolbar = ({ editor, onImageUpload, isUploading }: PostEditorToolbarProps) => {
  if (!editor) return null;

  return (
    <div className="border-b pb-4 mb-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          data-active={editor.isActive("heading", { level: 1 })}
        >
          <Heading className="h-4 w-4" />
        </Button>
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
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          data-active={editor.isActive("bulletList")}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          data-active={editor.isActive({ textAlign: 'left' })}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          data-active={editor.isActive({ textAlign: 'center' })}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          data-active={editor.isActive({ textAlign: 'right' })}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onImageUpload}
          disabled={isUploading}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          data-active={editor.isActive("codeBlock")}
        >
          <Code className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};