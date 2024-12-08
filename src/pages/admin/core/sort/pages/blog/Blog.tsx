import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CalendarDays, Clock, User, ArrowUpRight } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  author_id: string;
  featured_image: string | null;
  reading_time: number | null;
  views_count: number | null;
  created_at: string;
  category_id: string | null;
  publication_status: string;
  profiles: {
    display_name: string | null;
    username: string | null;
  };
  cms_categories: {
    name: string | null;
  } | null;
}

const Blog = () => {
  const [isHovered, setIsHovered] = useState(false);

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(`
          id,
          title,
          content,
          excerpt,
          author_id,
          featured_image,
          reading_time,
          views_count,
          created_at,
          category_id,
          publication_status,
          profiles!blog_posts_author_id_fkey (
            display_name,
            username
          ),
          cms_categories!blog_posts_category_id_fkey (
            name
          )
        `);
      if (error) throw error;
      return data as BlogPost[];
    },
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.8, ease: "easeInOut" },
  };

  const glowEffect = {
    whileHover: {
      scale: 1.02,
      boxShadow: "0px 4px 15px rgba(110, 27, 255, 0.5)",
    },
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <p className="text-red-500">Error loading blog posts. Please try again later.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(110,27,255,0.15)_0%,rgba(26,31,44,0)_70%)] backdrop-blur-md" />

        <div className="container mx-auto px-4 py-24">
          {/* Page Header */}
          <motion.div
            {...fadeInUp}
            className={`text-center mb-16 transition-transform duration-300 ${
              isHovered ? "blur-sm" : ""
            }`}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
              Latest Stories
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover insights, tutorials, and stories from our community.
            </p>
          </motion.div>

          {/* Blog Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts?.map((post, index) => (
              <motion.div
                key={post.id}
                {...fadeInUp}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                }}
                {...glowEffect}
                className="group rounded-md"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Card className="overflow-hidden bg-card/50 backdrop-blur-md border border-border/40 hover:border-primary/40 transition-all duration-300">
                  {post.featured_image && (
                    <div className="relative h-48 overflow-hidden rounded-md">
                      <motion.img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        {...glowEffect}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    </div>
                  )}
                  <div className="p-6 relative">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {post.cms_categories?.name || "Uncategorized"}
                      </Badge>
                      <Badge variant="outline" className="ml-auto">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.reading_time || 5} min read
                      </Badge>
                    </div>
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>
                          {post.profiles?.display_name || post.profiles?.username || "Anonymous"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4" />
                        <span>{format(new Date(post.created_at), "MMM d, yyyy")}</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Blog;
