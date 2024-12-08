import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import ContentVersions from "./ContentVersions";
import { MediaLibrary } from "./media";
import ContentListHeader from "./ContentListHeader";
import ContentTable from "./ContentTable";
import ContentEditor from "./ContentEditor";

const ContentList = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: content, isLoading } = useQuery({
    queryKey: ["cms-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cms_content")
        .select(`
          *,
          author:profiles(username)
        `)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const handleCreateContent = async (content: { 
    title: string; 
    content: string; 
    layout: string 
  }) => {
    try {
      const { error } = await supabase
        .from("cms_content")
        .insert([{
          title: content.title,
          content: content.content,
          metadata: { layout: content.layout },
          status: "draft",
          content_type: "page",
          slug: content.title.toLowerCase().replace(/\s+/g, "-"),
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Content has been created successfully.",
      });
      
      setShowEditor(false);
      queryClient.invalidateQueries({ queryKey: ["cms-content"] });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create content. Please try again.",
      });
    }
  };

  if (showEditor) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Create New Content</h2>
          <Button variant="ghost" onClick={() => setShowEditor(false)}>
            ← Back to List
          </Button>
        </div>
        <ContentEditor onSave={handleCreateContent} />
      </div>
    );
  }

  const handleBulkPublish = () => {
    if (selectedItems.length === 0) return;
    // Publishing logic here
  };

  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  if (isLoading) return <div>Loading content...</div>;

  return (
    <div className="space-y-4">
      <ContentListHeader
        selectedItems={selectedItems}
        onBulkPublish={handleBulkPublish}
        onShowMediaLibrary={() => setShowMediaLibrary(true)}
        onNewContent={() => setShowEditor(true)}
      />

      {showMediaLibrary ? (
        <div className="space-y-4">
          <Button
            variant="ghost"
            onClick={() => setShowMediaLibrary(false)}
          >
            ← Back to Content
          </Button>
          <MediaLibrary />
        </div>
      ) : (
        <ContentTable
          content={content}
          selectedItems={selectedItems}
          onToggleItem={toggleItemSelection}
          onToggleAll={(checked) => {
            if (checked) {
              setSelectedItems(content?.map(item => item.id) || []);
            } else {
              setSelectedItems([]);
            }
          }}
        />
      )}

      {content?.map((item) => (
        <ContentVersions key={item.id} contentId={item.id} />
      ))}
    </div>
  );
};

export default ContentList;