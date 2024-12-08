import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ContentTable from "./ContentTable";
import ContentHeader from "./ContentHeader";
import { supabase } from "@/integrations/supabase/client";

const ContentList = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

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

  const handleBulkPublish = () => {
    // Bulk publish logic
  };

  const handleShowMediaLibrary = () => {
    // Media library logic
  };

  return (
    <div className="space-y-4">
      <ContentHeader 
        selectedItems={selectedItems}
        onBulkPublish={handleBulkPublish}
        onShowMediaLibrary={handleShowMediaLibrary}
      />
      <ContentTable
        content={content || []}
        isLoading={isLoading}
        selectedItems={selectedItems}
        onToggleItem={(id) => {
          setSelectedItems(prev =>
            prev.includes(id)
              ? prev.filter(item => item !== id)
              : [...prev, id]
          );
        }}
        onToggleAll={(checked) => {
          if (checked) {
            setSelectedItems(content?.map(item => item.id) || []);
          } else {
            setSelectedItems([]);
          }
        }}
      />
    </div>
  );
};

export default ContentList;