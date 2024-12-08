import React from 'react';
import { createLowlight } from 'lowlight';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { EditorToolbar } from '@/components/common/editor/EditorToolbar';

const lowlight = createLowlight();

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

export const Editor = ({ content, onChange }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
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

  return (
    <div className="prose-container">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} className="prose max-w-none" />
    </div>
  );
};