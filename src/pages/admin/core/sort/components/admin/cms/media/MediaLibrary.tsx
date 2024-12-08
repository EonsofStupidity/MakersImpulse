import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Image, Upload, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { MediaUploadDialog } from "./MediaUploadDialog";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { MediaItem } from "./types";

export const MediaLibrary = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: mediaItems, isLoading } = useQuery({
    queryKey: ["media-library"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("media_library")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as MediaItem[];
    },
  });

  const deleteMediaMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const { error } = await supabase
        .from("media_library")
        .delete()
        .in("id", ids);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media-library"] });
      setSelectedItems([]);
      toast({
        title: "Success",
        description: "Selected media items have been deleted",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete media items",
        variant: "destructive",
      });
    },
  });

  const handleBulkDelete = () => {
    if (selectedItems.length === 0) return;
    deleteMediaMutation.mutate(selectedItems);
  };

  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  if (isLoading) return <div>Loading media library...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Media Library</h2>
        <div className="space-x-2">
          <Button
            variant="destructive"
            onClick={handleBulkDelete}
            disabled={selectedItems.length === 0}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Selected
          </Button>
          <MediaUploadDialog />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaItems?.map((item) => (
          <Card key={item.id} className="p-4 space-y-2">
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
              {item.file_type.startsWith("image/") ? (
                <img
                  src={item.url}
                  alt={item.alt_text || item.file_name}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <Image className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
              <div className="absolute top-2 left-2">
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={() => toggleItemSelection(item.id)}
                />
              </div>
            </div>
            <div className="space-y-1">
              <p className="font-medium truncate">{item.file_name}</p>
              {item.caption && (
                <p className="text-sm text-muted-foreground truncate">
                  {item.caption}
                </p>
              )}
            </div>
            <Button variant="outline" size="sm" className="w-full">
              <Edit className="w-4 h-4 mr-2" />
              Edit Details
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};