import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { Button } from "@/components/ui/button";
import ImageThumbnails from './components/ImageThumbnails';
import ExpandedPost from './components/ExpandedPost';
import ImageCarouselDialog from './components/ImageCarouselDialog';

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
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const displayContent = post.content.slice(0, 350);
  const hasMoreContent = post.content.length > 350;

  // Ensure images is always an array, even if undefined
  const images = post.images || [];
  console.log('Images in BlogPostCard:', images);

  // Use featured_image if available, otherwise use first image from images array
  const featuredImage = post.featured_image || (images.length > 0 ? images[0] : null);
  console.log('Featured image:', featuredImage);

  const handleImageClick = (index: number) => {
    console.log('Image clicked:', index);
    setCurrentImageIndex(index);
    setShowCarousel(true);
  };

  return (
    <div className="relative w-full mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="group relative bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 hover:border-[#ff0abe]/50 transition-all duration-300 overflow-visible min-h-[400px]"
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
            
            <div className="text-white/80 mb-6">
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
            <div className="flex justify-between items-center text-sm mb-4">
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
          </div>
        </div>

        {/* Image Thumbnails */}
        {images.length > 0 && (
          <div className="absolute -bottom-12 left-0 right-0 px-8">
            <ImageThumbnails 
              images={images} 
              onImageClick={handleImageClick} 
            />
          </div>
        )}
      </motion.div>

      <ExpandedPost
        isOpen={isExpanded}
        onOpenChange={setIsExpanded}
        post={post}
      />

      <ImageCarouselDialog
        isOpen={showCarousel}
        onOpenChange={setShowCarousel}
        images={images}
        currentIndex={currentImageIndex}
        onIndexChange={setCurrentImageIndex}
      />
    </div>
  );
};

export default BlogPostCard;