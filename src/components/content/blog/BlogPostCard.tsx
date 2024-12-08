import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ImageValidation from './components/ImageValidation';
import BlogPostDialog from './components/BlogPostDialog';
import BlogPostPreview from './components/BlogPostPreview';
import BlogPostMeta from './components/BlogPostMeta';

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
  const [validImages, setValidImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const displayContent = post.content.slice(0, 350);
  const hasMoreContent = post.content.length > 350;
  const featuredImage = post.featured_image || (validImages.length > 0 ? validImages[0] : null);

  console.log('Rendering BlogPostCard with post:', post);
  console.log('Valid images:', validImages);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full mb-24"
    >
      <ImageValidation
        images={post.images || []}
        onValidImagesChange={setValidImages}
        onLoadingChange={setIsLoading}
      />

      <div className="group relative bg-black/95 backdrop-blur-xl rounded-xl border border-white/10 hover:border-[#ff0abe]/50 transition-all duration-300 overflow-visible min-h-[400px] hover:shadow-[0_0_30px_rgba(255,10,190,0.15)]">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-[#ff0abe] animate-spin" />
          </div>
        ) : (
          featuredImage && (
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <motion.div 
                className="w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <motion.img 
                  src={featuredImage} 
                  alt={post.title}
                  className="w-full h-full object-cover opacity-50 transition-opacity duration-300 group-hover:opacity-60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/90 mix-blend-multiply opacity-90 group-hover:opacity-80 transition-opacity duration-300" />
              </motion.div>
            </div>
          )
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80 z-10 rounded-xl transition-opacity duration-300 group-hover:opacity-90" />

        <div className="relative z-20 p-8 h-full flex flex-col">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4 bg-white/5" />
              <Skeleton className="h-4 w-full bg-white/5" />
              <Skeleton className="h-4 w-2/3 bg-white/5" />
            </div>
          ) : (
            <>
              <BlogPostPreview
                title={post.title}
                content={displayContent}
                hasMoreContent={hasMoreContent}
                onReadMore={() => setIsExpanded(true)}
                onClick={() => setIsExpanded(true)}
              />
              <div className="mt-auto">
                <BlogPostMeta
                  publishedAt={post.published_at}
                  viewsCount={post.views_count}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <BlogPostDialog
        isOpen={isExpanded}
        onOpenChange={setIsExpanded}
        post={post}
      />
    </motion.div>
  );
};

export default BlogPostCard;