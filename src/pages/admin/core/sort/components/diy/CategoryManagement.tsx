import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusCircle, Hammer, Wrench, Paintbrush, Scissors, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const iconMap = {
  hammer: Hammer,
  wrench: Wrench,
  paintbrush: Paintbrush,
  scissors: Scissors,
  building: Building,
};

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: keyof typeof iconMap | null;
  color: string | null;
  parent_id: string | null;
  created_at: string | null;
};

const CategoryManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["diy-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("diy_categories")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data as Category[];
    },
  });

  if (isLoading) return <div>Loading categories...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">DIY Categories</h2>
        <Button>
          <PlusCircle className="w-4 h-4 mr-2" />
          New Category
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Icon</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Parent Category</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.map((category) => {
              const Icon = category.icon ? iconMap[category.icon] : Building;
              return (
                <TableRow key={category.id}>
                  <TableCell>
                    <Icon 
                      className="w-5 h-5" 
                      style={{ color: category.color || "#666" }} 
                    />
                  </TableCell>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    {category.parent_id ? (
                      categories.find(c => c.id === category.parent_id)?.name
                    ) : (
                      <Badge variant="secondary">Root Category</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {category.created_at ? new Date(category.created_at).toLocaleDateString() : "-"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default CategoryManagement;