import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface ValidationGroup {
  id: string;
  name: string;
  description?: string;
  group_type?: string;
  priority: number;
  parent_group_id?: string;
  metadata: Record<string, any>;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
}

export const ValidationGroupList = () => {
  const [groups, setGroups] = useState<ValidationGroup[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    const { data, error } = await supabase
      .from('validation_groups')
      .select('*')
      .order('priority', { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch validation groups",
        variant: "destructive"
      });
      return;
    }

    setGroups(data as ValidationGroup[]);
  };

  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <Card key={group.id} className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{group.name}</h3>
              {group.description && (
                <p className="text-sm text-muted-foreground">{group.description}</p>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              Priority: {group.priority}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};