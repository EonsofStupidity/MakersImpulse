import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { EditorToolbar } from './editor/EditorToolbar';
import { EditorStyles } from './editor/EditorStyles';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  onCategoryChange?: (category: string) => void;
  onTagsChange?: (tags: string[]) => void;
}

const lowlight = createLowlight(common);

const CATEGORIES = [
  'Guides',
  'Reviews',
  'Blog',
  'Site Updates',
  'Critical',
  '3D Printer',
  '3D Printer Hardware'
] as const;

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  content, 
  onChange,
  onCategoryChange,
  onTagsChange 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [activeTab, setActiveTab] = useState('visual');

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
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none p-4 min-h-[300px] focus:outline-none text-white',
      },
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

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange?.(category);
    toast.success(`Category "${category}" selected`);
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      const updatedTags = [...tags, newTag];
      setTags(updatedTags);
      onTagsChange?.(updatedTags);
      setNewTag('');
      toast.success(`Tag "${newTag}" added`);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
    onTagsChange?.(updatedTags);
    toast.success(`Tag "${tagToRemove}" removed`);
  };

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-black/40 backdrop-blur-xl">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full bg-white/5 border-b border-white/10">
          <TabsTrigger 
            value="visual"
            className="data-[state=active]:bg-white/10 data-[state=active]:text-white"
          >
            Visual
          </TabsTrigger>
          <TabsTrigger 
            value="code"
            className="data-[state=active]:bg-white/10 data-[state=active]:text-white"
          >
            Code
          </TabsTrigger>
          <TabsTrigger 
            value="seo"
            className="data-[state=active]:bg-white/10 data-[state=active]:text-white"
          >
            SEO
          </TabsTrigger>
        </TabsList>

        <TabsContent value="visual" className="mt-0">
          <EditorToolbar editor={editor} onImageAdd={addImage} />
          <EditorStyles>
            <EditorContent editor={editor} />
          </EditorStyles>
        </TabsContent>

        <TabsContent value="code" className="mt-0">
          <div className="p-4">
            <textarea
              value={editor.getHTML()}
              onChange={(e) => {
                editor.commands.setContent(e.target.value);
                onChange(e.target.value);
              }}
              className="w-full h-[400px] bg-black/20 text-white/90 p-4 rounded-md font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-neon-cyan/50"
            />
          </div>
        </TabsContent>

        <TabsContent value="seo" className="mt-0">
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Category</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={cn(
                      "flex items-center justify-between px-4 py-2 rounded-md border transition-all duration-300",
                      selectedCategory === category
                        ? "border-neon-cyan bg-neon-cyan/10 text-white"
                        : "border-white/10 hover:border-neon-cyan/50 text-white/70 hover:text-white"
                    )}
                  >
                    <span>{category}</span>
                    {selectedCategory === category && (
                      <Check className="w-4 h-4 text-neon-cyan animate-fade-in" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="px-3 py-1 bg-white/5 hover:bg-white/10 transition-colors group animate-fade-in"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 hover:text-neon-pink focus:outline-none"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <button
                  onClick={handleAddTag}
                  className="p-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan/50"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RichTextEditor;