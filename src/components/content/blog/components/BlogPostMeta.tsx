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
      <div className="flex items-center gap-4">
        <span className="text-[#ff0abe]">
          5 min read
        </span>
        {viewsCount !== null && (
          <span className="text-[#ff0abe]">
            {viewsCount} views
          </span>
        )}
      </div>
    </div>
  );
};

export default BlogPostMeta;