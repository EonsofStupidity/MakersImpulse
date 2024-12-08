import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Category } from "../types";

export const CategoryList = () => {
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cms_categories')
        .select('*');
      
      if (error) throw error;
      
      return (data || []).map(category => ({
        ...category,
        id: category.id.toString()
      })) as Category[];
    }
  });

  if (isLoading) return <div>Loading categories...</div>;
  if (error) return <div>Error loading categories: {(error as Error).message}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Categories</h1>
      <ul className="mt-4">
        {categories?.map((category) => (
          <li key={category.id} className="py-2">
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;