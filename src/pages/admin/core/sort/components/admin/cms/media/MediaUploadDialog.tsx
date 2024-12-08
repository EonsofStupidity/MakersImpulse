import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const MediaUploadDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload Media
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Media</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>File</Label>
            <Input type="file" />
          </div>
          <div className="space-y-2">
            <Label>Alt Text</Label>
            <Input placeholder="Describe the image..." />
          </div>
          <div className="space-y-2">
            <Label>Caption</Label>
            <Input placeholder="Add a caption..." />
          </div>
          <Button className="w-full">Upload</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};