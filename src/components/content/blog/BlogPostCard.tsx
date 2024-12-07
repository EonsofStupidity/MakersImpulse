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
    images?: string[];
  };
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const displayContent = post.content.slice(0, 350);
  const hasMoreContent = post.content.length > 350;

  const featuredImage = post.featured_image || (post.images && post.images.length > 0 
    ? post.images[Math.floor(Math.random() * post.images.length)] 
    : null);

  console.log('Post data in BlogPostCard:', post);
  console.log('Post images:', post.images);
  console.log('Featured image:', featuredImage);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="group relative bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 hover:border-[#ff0abe]/50 transition-all duration-300 overflow-visible h-[544px] w-full"
      >
        {featuredImage && (
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <motion.div 
              className="w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img 
                src={featuredImage} 
                alt="" 
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#ff0abe]/20 to-black/80 mix-blend-overlay" />
            </motion.div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80 z-10 rounded-xl" />

        <div className="relative z-20 p-8 h-full flex flex-col">
          <div className="flex-1">
            <h3 className="font-bold text-4xl text-white mb-4 group-hover:text-[#ff0abe] transition-colors duration-300">
              {post.title}
            </h3>
            
            <div className="text-white/80 mb-6 line-clamp-3">
              {displayContent}
              {hasMoreContent && (
                <Button 
                  variant="link" 
                  className="text-[#ff0abe] hover:text-[#ff0abe]/80 pl-2"
                  onClick={() => setIsExpanded(true)}
                >
                  Read more
                </Button>
              )}
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex justify-between items-center text-sm mb-8">
              <span className="text-[#ff0abe]">
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

            {post.images && post.images.length > 0 && (
              <motion.div 
                className="absolute left-8 right-8 -bottom-8 grid grid-cols-5 gap-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {post.images.slice(0, 5).map((image, index) => (
                  <motion.div 
                    key={index} 
                    className="relative aspect-square overflow-hidden rounded-lg border border-[#ff0abe]/20 shadow-lg shadow-[#ff0abe]/10"
                    whileHover={{ y: -5, scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-[#ff0abe]/20 mix-blend-overlay"
                      whileHover={{ opacity: 0 }}
                    />
                    <img 
                      src={image} 
                      alt="" 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent className="max-w-4xl h-[80vh] bg-[#1a1a1a] border-[#ff0abe]/20">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-6">
              {featuredImage && (
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <img 
                    src={featuredImage} 
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