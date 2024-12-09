import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { BaseContent, ContentFormData } from "../types/cms";

export const useContent = (contentId?: string) => {
  const queryClient = useQueryClient();

  const { data: content, isLoading } = useQuery({
    queryKey: ["cms_content", contentId],
    queryFn: async () => {
      console.log("Fetching content:", contentId);
      if (!contentId) return null;

      const { data, error } = await supabase
        .from("cms_content")
        .select("*")
        .eq("id", contentId)
        .single();

      if (error) {
        console.error("Error fetching content:", error);
        toast.error("Failed to load content");
        throw error;
      }

      return data as BaseContent;
    },
    enabled: !!contentId,
  });

  const { mutate: createContent } = useMutation({
    mutationFn: async (formData: ContentFormData) => {
      console.log("Creating content with data:", formData);
      
      // Ensure required fields are present
      const contentData = {
        title: formData.title,
        type: formData.type,
        content: formData.content || {},
        status: formData.status || "draft",
        slug: formData.slug,
        metadata: formData.metadata || {},
      };

      const { data, error } = await supabase
        .from("cms_content")
        .insert(contentData)
        .select()
        .single();

      if (error) {
        console.error("Error creating content:", error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms_content"] });
      toast.success("Content created successfully");
    },
    onError: (error) => {
      console.error("Error in content creation:", error);
      toast.error("Failed to create content");
    },
  });

  const { mutate: updateContent } = useMutation({
    mutationFn: async ({ id, ...formData }: ContentFormData & { id: string }) => {
      console.log("Updating content:", id, formData);
      const { data, error } = await supabase
        .from("cms_content")
        .update(formData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating content:", error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms_content"] });
      toast.success("Content updated successfully");
    },
    onError: (error) => {
      console.error("Error in content update:", error);
      toast.error("Failed to update content");
    },
  });

  return {
    content,
    isLoading,
    createContent,
    updateContent,
  };
};