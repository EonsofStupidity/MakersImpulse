import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { CategoryForm } from "./CategoryForm";
import { CategoryTable } from "./CategoryTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { generateSlug } from "@/utils/stringUtils";
import type { Category } from "./types";

export const CategoryList = () => {
  const { toast } = useToast();
  const session = useSession();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: userRole } = useQuery({
    queryKey: ["user-role"],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      const { data, error } = await supabase.rpc('get_user_role', {
        user_id: session.user.id
      });
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const isAdmin = userRole === 'admin';

  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ["cms-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cms_categories")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data || [];
    },
  });

  const createCategory = useMutation({
    mutationFn: async (categoryData: { name: string; description: string }) => {
      const { data: existingCategory, error: checkError } = await supabase
        .from("cms_categories")
        .select("id, name")
        .ilike("name", categoryData.name)
        .maybeSingle();

      if (checkError) {
        throw new Error("Failed to check for existing category: " + checkError.message);
      }

      if (existingCategory) {
        throw new Error(`Category "${categoryData.name}" already exists`);
      }

      const { data, error: insertError } = await supabase
        .from("cms_categories")
        .insert([{
          ...categoryData,
          slug: generateSlug(categoryData.name),
        }])
        .select()
        .single();

      if (insertError) throw insertError;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms-categories"] });
      toast({
        title: "Success",
        description: "Category created successfully",
      });
      setIsDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Failed to load categories</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categories</h2>
        {isAdmin && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="w-4 h-4 mr-2" />
                New Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Category</DialogTitle>
              </DialogHeader>
              <CategoryForm 
                onSubmit={createCategory.mutate}
                isSubmitting={createCategory.isPending}
                onCancel={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Card>
        <CategoryTable categories={categories} />
      </Card>
    </div>
  );
};