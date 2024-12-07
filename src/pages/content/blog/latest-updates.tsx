import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Navigation } from "@/components/shared/ui/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";

const fetchBlogPosts = async () => {
  console.log("Starting fetchBlogPosts function...");
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }
    
    console.log("Fetched blog posts successfully:", data);
    return data;
  } catch (error) {
    console.error("Error in fetchBlogPosts:", error);
    throw error;
  }
};

const GlitchEffect = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
    <div className="absolute inset-0 animate-glitch opacity-50" 
      style={{
        backgroundImage: "url('/lovable-uploads/4edf410a-5bd3-426b-8efe-fb8acb60e39c.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        mixBlendMode: "overlay"
      }}
    />
  </div>
);

const LatestUpdates = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: fetchBlogPosts,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  useEffect(() => {
    if (error) {
      console.error("Error in component:", error);
    }
  }, [error]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#1a1a1a] relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <Navigation />
      <GlitchEffect />
      
      <div 
        className="relative z-10 container mx-auto px-6 pt-32"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(65, 240, 219, 0.15), rgba(128, 0, 255, 0.15))`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-[#41f0db] text-5xl md:text-7xl font-bold mb-8 animate-neon-pulse">
            Latest Updates
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array(6).fill(null).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative bg-black/40 backdrop-blur-xl p-8 rounded-xl border border-white/10 h-[300px]"
              >
                <Skeleton className="h-8 w-2/3 bg-white/5 mb-4" />
                <Skeleton className="h-4 w-full bg-white/5 mb-2" />
                <Skeleton className="h-4 w-3/4 bg-white/5" />
              </motion.div>
            ))
          ) : error ? (
            <div className="col-span-full text-center text-red-400 bg-red-400/10 rounded-xl p-8 backdrop-blur-xl border border-red-400/20">
              Failed to load blog posts. Please try again later.
            </div>
          ) : posts?.length === 0 ? (
            <div className="col-span-full text-center text-white/70 bg-white/5 rounded-xl p-8 backdrop-blur-xl">
              No blog posts available yet.
            </div>
          ) : (
            posts?.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-black/40 backdrop-blur-xl p-8 rounded-xl border border-white/10 hover:border-[#41f0db]/50 transition-all duration-300"
                style={{
                  background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(65, 240, 219, 0.1), rgba(128, 0, 255, 0.1))`,
                }}
              >
                {post.featured_image && (
                  <div className="absolute inset-0 rounded-xl overflow-hidden opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                    <img src={post.featured_image} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#41f0db] transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-white/70 mb-6 line-clamp-3">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#41f0db] text-sm">
                      {post.published_at ? 
                        formatDistanceToNow(new Date(post.published_at), { addSuffix: true }) :
                        "Recently"
                      }
                    </span>
                    {post.views_count !== null && (
                      <span className="text-white/50 text-sm">
                        {post.views_count} views
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default LatestUpdates;