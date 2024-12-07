import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface BlogPostMetaProps {
  publishedAt?: string | null;
  viewsCount?: number | null;
}

const BlogPostMeta: React.FC<BlogPostMetaProps> = ({ publishedAt, viewsCount }) => {
  return (
    <div className="flex justify-between items-center text-sm mb-4">
      <span className="text-[#ff0abe]">
        {publishedAt ? 
          formatDistanceToNow(new Date(publishedAt), { addSuffix: true }) :
          "Recently"
        }
      </span>
      {viewsCount !== null && (
        <span className="text-white/50">
          {viewsCount} views
        </span>
      )}
    </div>
  );
};

export default BlogPostMeta;