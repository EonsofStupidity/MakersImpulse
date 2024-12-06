import { motion } from "framer-motion";
import { useState } from "react";
import { Navigation } from "@/components/shared/ui/Navigation";
import ImageCarousel from "@/components/shared/content-blocks/ImageCarousel";

// Featured blog posts data structure
const featuredPosts = [
  {
    id: 1,
    title: "Building Your First 3D Printer: A Complete Guide",
    description: "Learn how to assemble and calibrate your own 3D printer from scratch with our comprehensive guide.",
    date: "2024-03-20",
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
    ]
  },
  {
    id: 2,
    title: "Advanced Filament Techniques",
    description: "Master the art of working with different filament types and achieve professional-grade prints.",
    date: "2024-03-19",
    images: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
    ]
  },
  {
    id: 3,
    title: "Optimizing Print Settings",
    description: "Deep dive into slicer settings and how they affect your 3D prints quality and strength.",
    date: "2024-03-18",
    images: [
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    ]
  }
];

const LatestUpdates = () => {
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [currentUpdateIndex, setCurrentUpdateIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (updateIndex: number, imageIndex: number) => {
    setCurrentUpdateIndex(updateIndex);
    setCurrentImageIndex(imageIndex);
    setCarouselOpen(true);
  };

  const handleCarouselNavigation = (direction: 'next' | 'prev') => {
    const currentUpdate = featuredPosts[currentUpdateIndex];
    if (direction === 'next') {
      if (currentImageIndex < currentUpdate.images.length - 1) {
        setCurrentImageIndex(prev => prev + 1);
      } else if (currentUpdateIndex < featuredPosts.length - 1) {
        setCurrentUpdateIndex(prev => prev + 1);
        setCurrentImageIndex(0);
      }
    } else {
      if (currentImageIndex > 0) {
        setCurrentImageIndex(prev => prev - 1);
      } else if (currentUpdateIndex > 0) {
        setCurrentUpdateIndex(prev => prev - 1);
        setCurrentImageIndex(featuredPosts[currentUpdateIndex - 1].images.length - 1);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#1a1a1a] relative overflow-hidden"
    >
      <Navigation />
      
      <div className="relative z-10 container mx-auto px-6 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-[#41f0db] text-5xl md:text-7xl font-bold mb-8">
            Latest Updates
          </h1>
        </motion.div>

        <div className="space-y-12">
          {featuredPosts.map((post, postIndex) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: postIndex * 0.2 }}
              className="relative bg-black/40 backdrop-blur-xl p-8 rounded-xl border border-white/10 w-[165%] -ml-[32.5%]"
            >
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-8">
                  <h3 className="text-2xl font-bold text-white mb-4 hover:text-[#ff0abe] transition-colors duration-150">
                    {post.title}
                  </h3>
                  <p className="text-white/70 mb-6">{post.description}</p>
                  <span className="text-[#41f0db] text-sm">{post.date}</span>
                </div>
                <div className="col-span-4">
                  <div className="grid grid-cols-2 gap-2">
                    {post.images.map((image, imageIndex) => (
                      <motion.div
                        key={imageIndex}
                        whileHover={{ scale: 1.05 }}
                        className="cursor-pointer overflow-hidden rounded-lg"
                        onClick={() => handleImageClick(postIndex, imageIndex)}
                      >
                        <img
                          src={image}
                          alt={`${post.title} ${imageIndex + 1}`}
                          className="w-full h-32 object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ImageCarousel
        images={featuredPosts[currentUpdateIndex]?.images || []}
        isOpen={carouselOpen}
        currentIndex={currentImageIndex}
        onClose={() => setCarouselOpen(false)}
        onNavigate={handleCarouselNavigation}
      />

      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1a1a15] to-[#1a1a1a]" />
      </div>
    </motion.div>
  );
};

export default LatestUpdates;
