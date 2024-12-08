import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import PagePreview from "./PagePreview";
import { BuilderPage, BuilderElement } from "@/types/builder";
import BuilderHeader from "./components/BuilderHeader";
import BuilderTabs from "./components/BuilderTabs";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import DragDropEditor from "./visual-editor/DragDropEditor";

const defaultBreakpointConfig = {
  mobile: { width: 375, columns: 4 },
  tablet: { width: 768, columns: 8 },
  desktop: { width: 1280, columns: 12 }
};

const VisualPageBuilder = () => {
  const session = useSession();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("content");
  const [previewMode, setPreviewMode] = useState(false);
  const [elements, setElements] = useState<BuilderElement[]>([]);

  const { data: page, isLoading } = useQuery({
    queryKey: ["builder-page"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("builder_pages")
        .select("*")
        .eq("user_id", session?.user?.id)
        .single();

      if (error) throw error;
      
      const transformedData: BuilderPage = {
        ...data,
        content: typeof data.content === 'string' ? JSON.parse(data.content) : data.content,
        grid_settings: typeof data.grid_settings === 'string' ? JSON.parse(data.grid_settings) : data.grid_settings,
        breakpoint_config: typeof data.breakpoint_config === 'string' 
          ? JSON.parse(data.breakpoint_config) 
          : data.breakpoint_config || defaultBreakpointConfig,
        is_published: data.is_published || false
      };
      
      return transformedData;
    },
    enabled: !!session?.user?.id,
  });

  const updatePage = useMutation({
    mutationFn: async (updates: Partial<BuilderPage>) => {
      const contentToSave = {
        ...updates,
        content: updates.content ? {
          ...updates.content,
          elements: updates.content.elements.map(el => ({
            id: el.id,
            type: el.type,
            content: el.content
          }))
        } : undefined
      };

      const { error } = await supabase
        .from("builder_pages")
        .update(contentToSave)
        .eq("id", page?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["builder-page"] });
      toast({
        title: "Changes saved",
        description: "Your page has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save changes. Please try again.",
      });
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!page) {
    return <div>No page found. Please create one first.</div>;
  }

  const handleElementsChange = (newElements: BuilderElement[]) => {
    updatePage.mutate({
      content: { 
        ...page.content,
        elements: newElements
      }
    });
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <BuilderHeader 
        page={page}
        previewMode={previewMode}
        onPreviewToggle={() => setPreviewMode(!previewMode)}
        onPublishToggle={() => updatePage.mutate({ is_published: !page.is_published })}
      />

      {previewMode ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <PagePreview page={page} />
        </motion.div>
      ) : (
        <Card className="p-6">
          <DragDropEditor 
            elements={page.content.elements || []}
            onElementsChange={handleElementsChange}
            gridSettings={page.grid_settings}
          />
        </Card>
      )}
    </div>
  );
};

export default VisualPageBuilder;