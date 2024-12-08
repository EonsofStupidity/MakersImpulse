import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export function CreatePageDialog() {
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();

  const createPage = async () => {
    if (!session?.user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to create a page",
        variant: "destructive",
      });
      return;
    }

    const slug = title.toLowerCase().replace(/\s+/g, "-");

    const { data, error } = await supabase
      .from("builder_pages")
      .insert({
        user_id: session.user.id,
        title,
        slug,
        content: {},
        style_config: {},
        is_published: false,
      })
      .select()
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create page. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Page created successfully",
    });
    setOpen(false);
    navigate(`/build/${data.id}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New Page</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Page</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Page Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter page title"
            />
          </div>
          <Button onClick={createPage} className="w-full">
            Create Page
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}