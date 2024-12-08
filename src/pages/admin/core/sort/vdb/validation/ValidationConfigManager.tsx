import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const ValidationConfigManager = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: configs, isLoading } = useQuery({
    queryKey: ["validation-configs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("data_maestro_validation_configs")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const saveConfig = useMutation({
    mutationFn: async (validationRules: any) => {
      const { error } = await supabase
        .from("data_maestro_validation_configs")
        .insert({
          name,
          description,
          validation_rules: validationRules,
          field_mappings: {},
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["validation-configs"] });
      toast({
        title: "Success",
        description: "Validation configuration saved successfully",
      });
      setName("");
      setDescription("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to save validation configuration",
        variant: "destructive",
      });
    },
  });

  const loadConfig = useMutation({
    mutationFn: async (configId: string) => {
      const { data, error } = await supabase
        .from("data_maestro_validation_configs")
        .select("*")
        .eq("id", configId)
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "Validation configuration loaded successfully",
      });
    },
  });

  if (isLoading) return <div>Loading configurations...</div>;

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Save Current Configuration</h3>
        <div className="space-y-2">
          <Label htmlFor="name">Configuration Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter configuration name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter configuration description"
          />
        </div>
        <Button 
          onClick={() => saveConfig.mutate({})} 
          disabled={!name}
        >
          Save Configuration
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Saved Configurations</h3>
        <div className="space-y-2">
          {configs?.map((config) => (
            <Card key={config.id} className="p-4 hover:bg-accent transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{config.name}</h4>
                  <p className="text-sm text-muted-foreground">{config.description}</p>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => loadConfig.mutate(config.id)}
                >
                  Load
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
};