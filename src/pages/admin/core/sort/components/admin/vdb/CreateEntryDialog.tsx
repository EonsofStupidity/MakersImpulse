import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CreateEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateEntryDialog = ({ open, onOpenChange }: CreateEntryDialogProps) => {
  const { register, handleSubmit, reset } = useForm();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createEntry = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase
        .from("vdb_entries")
        .insert({
          table_name: data.table_name,
          entry_data: data.entry_data || {},
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vdb-entries"] });
      toast({
        title: "Entry Created",
        description: "New entry has been created successfully.",
      });
      reset();
      onOpenChange(false);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create entry. Please try again.",
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Entry</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit((data) => createEntry.mutate(data))} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="table_name">Table Name</Label>
            <Input
              id="table_name"
              {...register("table_name", { required: true })}
              placeholder="Enter table name"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createEntry.isPending}>
              {createEntry.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Create Entry
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};