import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { Button } from "@/components/ui/button";
import ImageGallery from './components/ImageGallery';
import ExpandedPost from './components/ExpandedPost';
import ImageCarouselDialog from './components/ImageCarouselDialog';
import { toast } from "sonner";

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
  const [imageLoadErrors, setImageLoadErrors] = useState<Record<string, boolean>>({});
  
  const displayContent = post.content.slice(0, 350);
  const hasMoreContent = post.content.length > 350;

  // Ensure images is always an array and filter out any null/undefined values
  const images = (post.images || []).filter(Boolean);
  console.log('Post ID:', post.id);
  console.log('Post images array:', images);
  
  // Use featured_image if available, otherwise use first valid image from images array
  const featuredImage = post.featured_image || (images.length > 0 ? images[0] : null);
  console.log('Featured image:', featuredImage);

  useEffect(() => {
    if (images.length > 0) {
      // Preload images and check their validity
      images.forEach((imageUrl, index) => {
        const img = new Image();
        img.onload = () => {
          console.log(`Image ${index} loaded successfully:`, imageUrl);
        };
        img.onerror = () => {
          console.error(`Image ${index} failed to load:`, imageUrl);
          setImageLoadErrors(prev => ({ ...prev, [imageUrl]: true }));
          toast.error(`Failed to load image ${index + 1}`);
        };
        img.src = imageUrl;
      });
    }
  }, [images]);

  const handleImageClick = (index: number) => {
    console.log('Image clicked:', index, 'URL:', images[index]);
    setCurrentImageIndex(index);
    setShowCarousel(true);
  };

  // Filter out images that failed to load
  const validImages = images.filter(img => !imageLoadErrors[img]);

  return (
    <div className="relative w-full mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="group relative bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 hover:border-[#ff0abe]/50 transition-all duration-300 overflow-visible min-h-[400px]"
      >
        {featuredImage && !imageLoadErrors[featuredImage] && (
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <motion.div 
              className="w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img 
                src={featuredImage} 
                alt={post.title}
                className="w-full h-full object-cover opacity-50"
                onError={(e) => {
                  console.error('Featured image failed to load:', featuredImage);
                  setImageLoadErrors(prev => ({ ...prev, [featuredImage]: true }));
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
                onLoad={() => console.log('Featured image loaded successfully:', featuredImage)}
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

        {/* Image Gallery - Only show if there are valid images */}
        {validImages.length > 0 && (
          <div className="absolute -bottom-12 left-0 right-0 z-30">
            <ImageGallery 
              images={validImages} 
              onImageClick={handleImageClick}
            />
          </div>
        )}
      </motion.div>

      {/* Expanded Post Dialog */}
      <ExpandedPost
        isOpen={isExpanded}
        onOpenChange={setIsExpanded}
        post={post}
      />

      {/* Image Carousel Dialog */}
      {validImages.length > 0 && (
        <ImageCarouselDialog
          isOpen={showCarousel}
          onOpenChange={setShowCarousel}
          images={validImages}
          currentIndex={currentImageIndex}
          onIndexChange={setCurrentImageIndex}
        />
      )}
    </div>
  );
};

export default BlogPostCard;