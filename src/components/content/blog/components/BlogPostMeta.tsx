import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface BlogPostMetaProps {
  publishedAt?: string | null;
  viewsCount?: number | null;
}

const BlogPostMeta: React.FC<BlogPostMetaProps> = ({ publishedAt, viewsCount }) => {
  return (
    <div className="absolute -bottom-84 right-8 flex items-center gap-4 text-sm">
      <span className="text-[#ff0abe]">
        {publishedAt ? 
          formatDistanceToNow(new Date(publishedAt), { addSuffix: true }) :
          "Recently"
        }
      </span>
      <span className="text-[#ff0abe]">
        5 min read
      </span>
      {viewsCount !== null && (
        <span className="text-[#ff0abe]">
          {viewsCount} views
        </span>
      )}
    </div>
  );
};

export default BlogPostMeta;