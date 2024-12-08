import React from 'react';
import { format } from 'date-fns';

interface BlogPostMetaProps {
  author: string;
  date: string;
  readTime?: number;
}

export const BlogPostMeta: React.FC<BlogPostMetaProps> = ({ author, date, readTime }) => {
  return (
    <div className="flex items-center gap-4 text-sm text-zinc-400">
      <span>{author}</span>
      <span>•</span>
      <span>{format(new Date(date), 'MMM dd, yyyy')}</span>
      {readTime && (
        <>
          <span>•</span>
          <span>{readTime} min read</span>
        </>
      )}
    </div>
  );
};