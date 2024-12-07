import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ExpandedPostProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  post: {
    title: string;
    content: string;
    featured_image?: string | null;
  };
}

const ExpandedPost: React.FC<ExpandedPostProps> = ({ isOpen, onOpenChange, post }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] bg-[#1a1a1a] border-[#ff0abe]/20">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-6">
            {post.featured_image && (
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <img 
                  src={post.featured_image} 
                  alt="" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h2 className="text-3xl font-bold text-white">{post.title}</h2>
            <div className="prose prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ExpandedPost;