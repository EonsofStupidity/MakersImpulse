import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight'
import { Button } from "@/components/ui/button";
import { 
  Bold, 
  Italic, 
  Code, 
  Image as ImageIcon,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-black/40 backdrop-blur-xl">
      <div className="border-b border-white/10 p-2 flex gap-2 flex-wrap bg-white/5">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-white/10' : ''}
        >
          <Bold className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-white/10' : ''}
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'bg-white/10' : ''}
        >
          <Code className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'bg-white/10' : ''}
        >
          <Heading1 className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'bg-white/10' : ''}
        >
          <Heading2 className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-white/10' : ''}
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-white/10' : ''}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'bg-white/10' : ''}
        >
          <Quote className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={addImage}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
      </div>

      <EditorContent 
        editor={editor} 
        className="prose prose-invert max-w-none p-4 min-h-[300px] focus:outline-none"
      />

      <style>{`
        .ProseMirror {
          min-height: 300px;
          outline: none;
        }
        .ProseMirror p {
          margin: 1em 0;
        }
        .ProseMirror code {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 0.25rem;
          padding: 0.2em 0.4em;
        }
        .ProseMirror pre {
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 0.5rem;
          padding: 1em;
          margin: 1em 0;
        }
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
        }
        .ProseMirror blockquote {
          border-left: 3px solid rgba(255, 255, 255, 0.2);
          padding-left: 1em;
          margin-left: 0;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;