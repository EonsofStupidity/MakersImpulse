import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "@supabase/auth-helpers-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CreateCommunityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  name: string;
  description: string;
  category: string;
  is_private: boolean;
}

const CreateCommunityDialog = ({ open, onOpenChange }: CreateCommunityDialogProps) => {
  const session = useSession();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<FormData>();

  const createMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      const { error } = await supabase
        .from("sub_communities")
        .insert({
          name: data.name,
          slug,
          description: data.description,
          category: data.category,
          is_private: data.is_private,
          creator_id: session?.user?.id,
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      form.reset();
      onOpenChange(false);
      toast({
        title: "Community created",
        description: "Your community has been created successfully.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error creating community",
        description: "Please try again later.",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    createMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Community</DialogTitle>
          <DialogDescription>
            Create a new community to connect with others who share your interests.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., 3d_printing, electronics" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_private"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Private Community</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={createMutation.isPending}
              >
                Create Community
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCommunityDialog;