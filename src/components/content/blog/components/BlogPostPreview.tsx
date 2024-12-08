import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

interface BlogPostPreviewProps {
  title: string;
  content: string;
  hasMoreContent: boolean;
  onReadMore: () => void;
  onClick: () => void;
}

const BlogPostPreview: React.FC<BlogPostPreviewProps> = ({
  title,
  content,
  hasMoreContent,
  onReadMore,
  onClick,
}) => {
  return (
    <div 
      className="flex-1 max-w-full overflow-hidden cursor-pointer"
      onClick={onClick}
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
  );
};

export default BlogPostPreview;