import { motion } from "framer-motion";
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

const LatestUpdates = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: fetchBlogPosts,
  });

  useEffect(() => {
    console.log("LatestUpdates component state:", { posts, isLoading, error });
  }, [posts, isLoading, error]);

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
          {isLoading ? (
            Array(3).fill(null).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative bg-black/40 backdrop-blur-xl p-8 rounded-xl border border-white/10"
              >
                <Skeleton className="h-8 w-2/3 bg-white/5 mb-4" />
                <Skeleton className="h-4 w-full bg-white/5 mb-2" />
                <Skeleton className="h-4 w-3/4 bg-white/5" />
              </motion.div>
            ))
          ) : error ? (
            <div className="text-center text-red-400">
              Failed to load blog posts. Please try again later.
              {console.error("Error in component:", error)}
            </div>
          ) : posts?.length === 0 ? (
            <div className="text-center text-white/70">
              No blog posts available yet.
            </div>
          ) : (
            posts?.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative bg-black/40 backdrop-blur-xl p-8 rounded-xl border border-white/10"
              >
                <h3 className="text-2xl font-bold text-white mb-4 hover:text-[#ff0abe] transition-colors duration-150">
                  {post.title}
                </h3>
                <p className="text-white/70 mb-6">{post.excerpt}</p>
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
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1a1a15] to-[#1a1a1a]" />
      </div>
    </motion.div>
  );
};

export default LatestUpdates;