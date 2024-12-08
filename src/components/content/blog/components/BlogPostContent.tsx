import React from 'react';

interface BlogPostContentProps {
  content: string;
}

export const BlogPostContent: React.FC<BlogPostContentProps> = ({ content }) => {
  return (
    <div className="prose prose-invert max-w-none">
      {content}
    </div>
  );
};