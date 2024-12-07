import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface BlogPostMetaProps {
  publishedAt?: string | null;
  viewsCount?: number | null;
}

const BlogPostMeta: React.FC<BlogPostMetaProps> = ({ publishedAt, viewsCount }) => {
  return (
    <div className="flex justify-between items-center text-sm mb-4">
      <div className="flex items-center gap-2">
        <span className="text-[#ff0abe]">
          {publishedAt ? 
            formatDistanceToNow(new Date(publishedAt), { addSuffix: true }) :
            "Recently"
          }
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-white/50">
          5 min read
        </span>
        {viewsCount !== null && (
          <span className="text-white/50">
            {viewsCount} views
          </span>
        )}
      </div>
    </div>
  );
};

export default BlogPostMeta;