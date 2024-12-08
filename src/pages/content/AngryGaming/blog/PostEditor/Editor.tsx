import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { EditorToolbar } from "@/components/common/editor/EditorToolbar";

interface EditorProps {
  initialContent?: string;
  onChange: (content: string) => void;
}

export const Editor = ({ initialContent = "", onChange }: EditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} className="p-4" />
    </div>
  );
};