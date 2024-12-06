import { motion } from "framer-motion";
import { useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import ImageCarousel from "@/components/features/ImageCarousel";

// Mock data - replace with actual API call
const updates = [
  {
    id: 1,
    title: "New Feature Release",
    description: "Check out the newest features and improvements in our latest release.",
    date: "2024-03-20",
    images: [
      "/lovable-uploads/d4a9206e-82dc-4915-a14c-ba3c8bfb6f1c.png",
      "/placeholder.svg",
      "/placeholder.svg"
    ]
  },
  {
    id: 2,
    title: "Platform Updates",
    description: "Major improvements to our platform's performance and user experience.",
    date: "2024-03-19",
    images: ["/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: 3,
    title: "Community Highlights",
    description: "Featuring the best projects from our amazing community members.",
    date: "2024-03-18",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  }
];

const Home = () => {
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [currentUpdateIndex, setCurrentUpdateIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (updateIndex: number, imageIndex: number) => {
    setCurrentUpdateIndex(updateIndex);
    setCurrentImageIndex(imageIndex);
    setCarouselOpen(true);
  };

  const handleCarouselNavigation = (direction: 'next' | 'prev') => {
    const currentUpdate = updates[currentUpdateIndex];
    if (direction === 'next') {
      if (currentImageIndex < currentUpdate.images.length - 1) {
        setCurrentImageIndex(prev => prev + 1);
      } else if (currentUpdateIndex < updates.length - 1) {
        setCurrentUpdateIndex(prev => prev + 1);
        setCurrentImageIndex(0);
      }
    } else {
      if (currentImageIndex > 0) {
        setCurrentImageIndex(prev => prev - 1);
      } else if (currentUpdateIndex > 0) {
        setCurrentUpdateIndex(prev => prev - 1);
        setCurrentImageIndex(updates[currentUpdateIndex - 1].images.length - 1);
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
          {updates.map((update, updateIndex) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: updateIndex * 0.2 }}
              className="relative bg-black/40 backdrop-blur-xl p-8 rounded-xl border border-white/10 w-[165%] -ml-[32.5%]"
            >
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-8">
                  <h3 className="text-2xl font-bold text-white mb-4 hover:text-[#ff0abe] transition-colors duration-150">
                    {update.title}
                  </h3>
                  <p className="text-white/70 mb-6">{update.description}</p>
                  <span className="text-[#41f0db] text-sm">{update.date}</span>
                </div>
                <div className="col-span-4">
                  <div className="grid grid-cols-2 gap-2">
                    {update.images.map((image, imageIndex) => (
                      <motion.div
                        key={imageIndex}
                        whileHover={{ scale: 1.05 }}
                        className="cursor-pointer overflow-hidden rounded-lg"
                        onClick={() => handleImageClick(updateIndex, imageIndex)}
                      >
                        <img
                          src={image}
                          alt={`${update.title} ${imageIndex + 1}`}
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
        images={updates[currentUpdateIndex]?.images || []}
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

export default Home;