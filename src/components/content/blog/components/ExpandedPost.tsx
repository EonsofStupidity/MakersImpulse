import React from 'react';
import { BlogPostContent } from './BlogPostContent';
import { BlogPostMeta } from './BlogPostMeta';

interface ExpandedPostProps {
  title: string;
  content: string;
  author: string;
  date: string;
  readTime?: number;
}

export const ExpandedPost: React.FC<ExpandedPostProps> = ({
  title,
  content,
  author,
  date,
  readTime,
}) => {
  return (
    <article className="space-y-6">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <BlogPostMeta author={author} date={date} readTime={readTime} />
      <BlogPostContent content={content} />
    </article>
  );
};