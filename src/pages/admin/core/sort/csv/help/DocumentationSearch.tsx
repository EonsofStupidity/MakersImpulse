import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

export const DocumentationSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: docs } = useQuery({
    queryKey: ['import-documentation', searchTerm],
    queryFn: async () => {
      const query = supabase
        .from('csv_parsing_documentation')
        .select('*')
        .order('created_at');

      if (searchTerm) {
        query.textSearch('content', searchTerm);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  return (
    <Card className="p-4">
      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search documentation..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>
      <ScrollArea className="h-[300px]">
        {docs?.map((doc) => (
          <div key={doc.id} className="mb-4">
            <h3 className="text-lg font-medium mb-2">{doc.topic}</h3>
            <p className="text-sm text-muted-foreground">{doc.content}</p>
          </div>
        ))}
      </ScrollArea>
    </Card>
  );
};