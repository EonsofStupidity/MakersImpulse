import React, { useEffect } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import AnimatedTextReveal from './AnimatedTextReveal';
import ImageGallery from './ImageGallery';
import { motion } from 'framer-motion';

interface BlogPostDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  post: {
    title: string;
    content: string;
    images?: string[];
  };
}

const BlogPostDialog: React.FC<BlogPostDialogProps> = ({ isOpen, onOpenChange, post }) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, onOpenChange]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] p-0 bg-black/95 border-[#ff0abe]/20 overflow-hidden">
        <div className="flex flex-col h-full">
          <ScrollArea className="flex-1 p-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white mb-6"
            >
              {post.title}
            </motion.h2>
            <AnimatedTextReveal content={post.content} />
          </ScrollArea>
          
          {post.images && post.images.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-auto border-t border-white/10 p-4 bg-black/60"
            >
              <ImageGallery 
                images={post.images} 
                onImageClick={() => {}} 
              />
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogPostDialog;