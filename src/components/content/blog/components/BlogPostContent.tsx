import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { useCyberpunkViewer } from './viewer/useCyberpunkViewer';
import CyberpunkViewerButton from './viewer/CyberpunkViewerButton';

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
  const { isOpen, openViewer, closeViewer } = useCyberpunkViewer();

  const handleContentClick = () => {
    console.log('Opening viewer with content:', content);
    openViewer(content);
  };

  return (
    <div className="flex-1 max-w-full overflow-hidden">
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
          <div className="flex items-center gap-2">
            <Button 
              variant="link" 
              className="text-[#ff0abe] hover:text-[#ff0abe]/80 pl-0"
              onClick={(e) => {
                e.stopPropagation();
                onReadMore();
              }}
            >
              Read more
            </Button>
            <span className="text-white/40">or</span>
            <CyberpunkViewerButton onClick={handleContentClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostContent;