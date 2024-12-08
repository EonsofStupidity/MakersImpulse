import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { generateSlug } from "@/utils/stringUtils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Category } from "./types";

export function CreateCategoryDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createCategory = useMutation({
    mutationFn: async (categoryData: typeof newCategory) => {
      // First check if category exists
      const { data: existingCategory } = await supabase
        .from("cms_categories")
        .select("id, name")
        .ilike("name", categoryData.name)
        .single();

      if (existingCategory) {
        throw new Error(`Category "${categoryData.name}" already exists`);
      }

      const { data, error } = await supabase
        .from("cms_categories")
        .insert([{ 
          ...categoryData,
          slug: generateSlug(categoryData.name),
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms-categories"] });
      toast({
        title: "Success",
        description: "Category created successfully",
      });
      setIsOpen(false);
      setNewCategory({ name: "", description: "" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCategory.mutate(newCategory);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Create New Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
              placeholder="Category name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newCategory.description}
              onChange={(e) =>
                setNewCategory({ ...newCategory, description: e.target.value })
              }
              placeholder="Category description"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createCategory.isPending}>
              Create Category
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}