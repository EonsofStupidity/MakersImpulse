import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Save, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { EntryForm } from "./EntryForm";
import { EntryList } from "./EntryList";
import { CreateEntryDialog } from "./CreateEntryDialog";

export const SingleEntryManager = () => {
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: entries, isLoading } = useQuery({
    queryKey: ["vdb-entries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vdb_entries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const updateEntry = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { error } = await supabase
        .from("vdb_entries")
        .update({ entry_data: data })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vdb-entries"] });
      toast({
        title: "Entry Updated",
        description: "The entry has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update entry. Please try again.",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Data Entries</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Entry
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 p-4">
          <EntryList
            entries={entries || []}
            selectedEntry={selectedEntry}
            onSelectEntry={setSelectedEntry}
          />
        </Card>

        <Card className="md:col-span-2 p-4">
          {selectedEntry ? (
            <EntryForm
              entry={entries?.find((e) => e.id === selectedEntry)}
              onSave={(data) => updateEntry.mutate({ id: selectedEntry, data })}
            />
          ) : (
            <div className="text-center text-muted-foreground p-8">
              Select an entry to edit
            </div>
          )}
        </Card>
      </div>

      <CreateEntryDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
};