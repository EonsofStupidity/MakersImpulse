import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import AnimatedTextReveal from './AnimatedTextReveal';
import { motion, AnimatePresence } from 'framer-motion';
import CyberpunkBlogViewer from './CyberpunkBlogViewer';

interface BlogPostContentProps {
  title: string;
  content: string;
  onReadMore: () => void;
  hasMoreContent: boolean;
  images?: string[];
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({
  title,
  content,
  onReadMore,
  hasMoreContent,
  images = [],
}) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [showCyberpunkViewer, setShowCyberpunkViewer] = React.useState(false);

  const handleContentClick = () => {
    setShowCyberpunkViewer(true);
  };

  return (
    <>
      <div 
        className="flex-1 max-w-full overflow-hidden cursor-pointer"
        onClick={handleContentClick}
      >
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-bold text-4xl text-white mb-4 group-hover:text-[#ff0abe] transition-colors duration-300 line-clamp-2"
        >
          {title}
        </motion.h3>
        
        <div className="text-white/80 mb-6 prose prose-invert max-w-none">
          <div 
            className="line-clamp-3 break-words whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: content }} 
          />
          {hasMoreContent && (
            <Button 
              variant="link" 
              className="text-[#ff0abe] hover:text-[#ff0abe]/80 pl-2"
              onClick={(e) => {
                e.stopPropagation();
                onReadMore();
              }}
            >
              Read more
            </Button>
          )}
        </div>
      </div>

      <CyberpunkBlogViewer
        content={content}
        isOpen={showCyberpunkViewer}
        onClose={() => setShowCyberpunkViewer(false)}
      />
    </>
  );
};

export default BlogPostContent;