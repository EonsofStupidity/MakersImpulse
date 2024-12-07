import React from "react";
import { Navigation } from "@/components/shared/ui/Navigation";
import { AdminNav } from "@/components/admin/dashboard/AdminNav";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const PostsManagement = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['admin-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-900 pt-20 p-8">
        <AdminNav />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Posts Management</h1>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 text-[#ff0abe] animate-spin" />
            </div>
          ) : (
            <div className="grid gap-6">
              {/* Posts table will be implemented here */}
              <pre className="text-white">
                {JSON.stringify(posts, null, 2)}
              </pre>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default PostsManagement;