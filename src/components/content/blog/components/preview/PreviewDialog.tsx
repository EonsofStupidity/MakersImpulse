import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface PreviewDialogProps {
  title: string;
  content: string;
}

export const PreviewDialog: React.FC<PreviewDialogProps> = ({ title, content }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-[#41f0db]/20 backdrop-blur-sm text-white border border-[#41f0db]/50 hover:bg-[#41f0db]/30 hover:border-[#41f0db] transition-all duration-300 shadow-[0_0_10px_rgba(65,240,219,0.3)] animate-fade-in"
        >
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-black/90 border border-[#41f0db]/30 backdrop-blur-xl animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white mb-4">{title || 'Untitled Post'}</DialogTitle>
        </DialogHeader>
        <div className="prose prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </DialogContent>
    </Dialog>
  );
};