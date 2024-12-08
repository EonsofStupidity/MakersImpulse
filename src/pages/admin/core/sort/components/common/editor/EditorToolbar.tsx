import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Image as ImageIcon,
  Undo,
  Redo,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Table,
  Heading1,
  Heading2,
  Quote,
} from "lucide-react";

interface EditorToolbarProps {
  editor: Editor | null;
  onImageUpload?: () => void;
  isUploading?: boolean;
  variant?: 'default' | 'minimal' | 'full';
}

export const EditorToolbar = ({ 
  editor, 
  onImageUpload, 
  isUploading,
  variant = 'default'
}: EditorToolbarProps) => {
  if (!editor) return null;

  const renderDefaultButtons = () => (
    <>
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
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        data-active={editor.isActive("orderedList")}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      {onImageUpload && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onImageUpload}
          disabled={isUploading}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
      )}
    </>
  );

  const renderFullButtons = () => (
    <>
      {renderDefaultButtons()}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        data-active={editor.isActive("heading", { level: 1 })}
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        data-active={editor.isActive("heading", { level: 2 })}
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        data-active={editor.isActive("blockquote")}
      >
        <Quote className="h-4 w-4" />
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
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        data-active={editor.isActive("codeBlock")}
      >
        <Code className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <Redo className="h-4 w-4" />
      </Button>
    </>
  );

  return (
    <div className="border-b pb-4 mb-4 flex flex-wrap gap-2">
      {variant === 'minimal' && renderDefaultButtons()}
      {variant === 'default' && renderDefaultButtons()}
      {variant === 'full' && renderFullButtons()}
    </div>
  );
};

export default EditorToolbar;