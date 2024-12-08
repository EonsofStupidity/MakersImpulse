import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { ComponentData } from "@/components/build/ComponentSelector";
import type { FilterPreferences } from "@/components/build/AdvancedFilter";

// Define valid component table names
type ComponentTableName = "base_product" | "bearings" | "extruders" | "addons";

const PAGE_SIZE = 10;

export const useComponentList = (
  type: ComponentTableName,
  filters: FilterPreferences,
  compatibleWith?: string[],
  page: number = 1
) => {
  const { data: components, isLoading, error } = useQuery({
    queryKey: ["components", type, compatibleWith, filters, page],
    queryFn: async () => {
      let query = supabase
        .from(type)
        .select("*", { count: 'exact' })
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

      if (filters.showCompatibleOnly && compatibleWith?.length) {
        query = query.contains('compatibility', compatibleWith);
      }

      if (filters.priceRange) {
        query = query
          .gte('cost_usd', filters.priceRange[0])
          .lte('cost_usd', filters.priceRange[1]);
      }

      const { data, error, count } = await query;
      if (error) throw error;
      return { 
        items: data as ComponentData[],
        totalCount: count || 0,
        totalPages: Math.ceil((count || 0) / PAGE_SIZE)
      };
    }
  });

  const filteredAndSortedComponents = components?.items
    ?.filter(component => 
      component.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      component.manufacturer?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      component.summary?.toLowerCase().includes(filters.searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "cost":
          return (a.cost_usd || 0) - (b.cost_usd || 0);
        case "cost-desc":
          return (b.cost_usd || 0) - (a.cost_usd || 0);
        case "manufacturer":
          return (a.manufacturer || "").localeCompare(b.manufacturer || "");
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return { 
    components: filteredAndSortedComponents, 
    isLoading, 
    error,
    totalPages: components?.totalPages || 1,
    totalCount: components?.totalCount || 0
  };
};