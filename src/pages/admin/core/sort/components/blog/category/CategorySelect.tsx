import { useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

interface CategorySelectProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export const CategorySelect = ({ selectedId, onSelect }: CategorySelectProps) => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['cms-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cms_categories')
        .select('id, name')
        .order('name');
        
      if (error) throw error;
      return data || [];
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Label>Category</Label>
        <select disabled className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm opacity-50">
          <option>Loading categories...</option>
        </select>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label>Category</Label>
      <select 
        value={selectedId || ''}
        onChange={(e) => onSelect(e.target.value)}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
      >
        <option value="">Select a category</option>
        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;