import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CreateProgramDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  title: string;
  description: string;
  expertise_areas: string;
  max_mentees: number;
}

const CreateProgramDialog = ({ open, onOpenChange }: CreateProgramDialogProps) => {
  const session = useSession();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (!session?.user?.id) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("mentorship_programs")
        .insert({
          mentor_id: session.user.id,
          title: data.title,
          description: data.description,
          expertise_areas: data.expertise_areas.split(",").map(area => area.trim()),
          max_mentees: data.max_mentees,
        });

      if (error) throw error;

      toast({
        title: "Program Created",
        description: "Your mentorship program has been created successfully.",
      });

      queryClient.invalidateQueries({ queryKey: ["mentorship-programs"] });
      reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create mentorship program. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Mentorship Program</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Program Title</Label>
            <Input
              id="title"
              {...register("title", { required: true })}
              placeholder="e.g., 3D Printer Building Fundamentals"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description", { required: true })}
              placeholder="Describe your mentorship program..."
              className="h-24"
            />
          </div>

          <div>
            <Label htmlFor="expertise_areas">
              Areas of Expertise (comma-separated)
            </Label>
            <Input
              id="expertise_areas"
              {...register("expertise_areas", { required: true })}
              placeholder="e.g., CoreXY, Motion Systems, Electronics"
            />
          </div>

          <div>
            <Label htmlFor="max_mentees">Maximum Mentees</Label>
            <Input
              id="max_mentees"
              type="number"
              {...register("max_mentees", { 
                required: true,
                min: 1,
                max: 10,
                valueAsNumber: true,
              })}
              defaultValue={5}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Create Program
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProgramDialog;