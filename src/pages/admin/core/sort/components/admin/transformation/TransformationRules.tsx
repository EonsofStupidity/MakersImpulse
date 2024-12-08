import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const TransformationRules = () => {
  const { data: rules } = useQuery({
    queryKey: ["transformation-rules"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("data_transformation_rules")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Data Transformation</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Rule
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rules?.map((rule) => (
          <Card key={rule.id} className="p-4 space-y-2">
            <h3 className="font-medium">{rule.name}</h3>
            <p className="text-sm text-muted-foreground">{rule.description}</p>
            <div className="flex justify-end">
              <Button variant="outline" size="sm">Configure</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TransformationRules;