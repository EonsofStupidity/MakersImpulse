import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface BlogPostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    excerpt?: string | null;
    featured_image?: string | null;
    published_at?: string | null;
    views_count?: number | null;
  };
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const displayContent = post.content.slice(0, 350);
  const hasMoreContent = post.content.length > 350;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="group relative bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 hover:border-[#41f0db]/50 transition-all duration-300 overflow-hidden h-[544px] w-full"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80 z-10" />
        
        {post.featured_image && (
          <div className="absolute inset-0 flex">
            <div className="w-1/3 h-full relative">
              <img 
                src={post.featured_image} 
                alt="" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50" />
            </div>
            <div className="w-2/3 h-full">
              <img 
                src={post.featured_image} 
                alt="" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-50"
              />
            </div>
          </div>
        )}

        <div className="relative z-20 p-8 h-full flex flex-col justify-end">
          <h3 className="font-bold text-4xl text-white mb-4 group-hover:text-[#41f0db] transition-colors duration-300">
            {post.title}
          </h3>
          
          <div className="text-white/80 mb-6 line-clamp-3">
            {displayContent}
            {hasMoreContent && (
              <Button 
                variant="link" 
                className="text-[#41f0db] hover:text-[#41f0db]/80 pl-2"
                onClick={() => setIsExpanded(true)}
              >
                Read more
              </Button>
            )}
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-[#41f0db]">
              {post.published_at ? 
                formatDistanceToNow(new Date(post.published_at), { addSuffix: true }) :
                "Recently"
              }
            </span>
            {post.views_count !== null && (
              <span className="text-white/50">
                {post.views_count} views
              </span>
            )}
          </div>
        </div>
      </motion.div>

      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent className="max-w-4xl h-[80vh] bg-[#1a1a1a] border-[#41f0db]/20">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-6">
              {post.featured_image && (
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <img 
                    src={post.featured_image} 
                    alt="" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h2 className="text-3xl font-bold text-white">{post.title}</h2>
              <div className="prose prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BlogPostCard;