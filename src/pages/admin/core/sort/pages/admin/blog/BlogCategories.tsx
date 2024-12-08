import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const BlogCategories = () => {
  const [newCategory, setNewCategory] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["blog-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cms_categories")
        .select("*")
        .order("name");

      if (error) throw error;
      return data;
    },
  });

  const createCategory = useMutation({
    mutationFn: async (name: string) => {
      const { data, error } = await supabase
        .from("cms_categories")
        .insert([{ 
          name,
          slug: name.toLowerCase().replace(/\s+/g, "-")
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-categories"] });
      toast({
        title: "Success",
        description: "Category added successfully",
      });
      setNewCategory("");
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    createCategory.mutate(newCategory);
  };

  if (isLoading) return <div>Loading categories...</div>;

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Blog Categories</h2>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="newCategory">New Category</Label>
              <Input
                id="newCategory"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name"
              />
            </div>
            <Button 
              onClick={handleAddCategory}
              className="mt-8"
              disabled={!newCategory.trim() || createCategory.isPending}
            >
              Add Category
            </Button>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Existing Categories</h3>
            <div className="space-y-2">
              {categories?.map((category) => (
                <div key={category.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span>{category.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BlogCategories;