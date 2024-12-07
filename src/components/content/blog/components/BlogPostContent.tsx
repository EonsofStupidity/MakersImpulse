import React from 'react';
import { Button } from "@/components/ui/button";

interface BlogPostContentProps {
  title: string;
  content: string;
  onReadMore: () => void;
  hasMoreContent: boolean;
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({
  title,
  content,
  onReadMore,
  hasMoreContent,
}) => {
  return (
    <div className="flex-1">
      <h3 className="font-bold text-4xl text-white mb-4 group-hover:text-[#ff0abe] transition-colors duration-300">
        {title}
      </h3>
      
      <div className="text-white/80 mb-6">
        {content}
        {hasMoreContent && (
          <Button 
            variant="link" 
            className="text-[#ff0abe] hover:text-[#ff0abe]/80 pl-2"
            onClick={onReadMore}
          >
            Read more
          </Button>
        )}
      </div>
    </div>
  );
};

export default BlogPostContent;