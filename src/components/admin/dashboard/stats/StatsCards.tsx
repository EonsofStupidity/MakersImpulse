import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Users, ChartBar, Database, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const GLASS_TINT_COLORS = ['#4efc03', '#ebfc03', '#03fcf8', '#d10fcb'];
const getRandomGlassTint = () => GLASS_TINT_COLORS[Math.floor(Math.random() * GLASS_TINT_COLORS.length)];

export const StatsCards = () => {
  const { data: metrics } = useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: async () => {
      const [
        { count: usersCount }, 
        { count: sessionsCount },
        { count: contentCount },
        { count: postsCount }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('active_2fa_sessions').select('*', { count: 'exact', head: true }),
        supabase.from('cms_content').select('*', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true })
      ]);

      return {
        users: usersCount || 0,
        sessions: sessionsCount || 0,
        content: contentCount || 0,
        posts: postsCount || 0
      };
    }
  });

  const stats = [
    { 
      label: "Total Users", 
      value: metrics?.users.toLocaleString() || "0", 
      icon: Users, 
      change: "+12%",
      color: getRandomGlassTint()
    },
    { 
      label: "Active Sessions", 
      value: metrics?.sessions.toLocaleString() || "0", 
      icon: ChartBar, 
      change: "+5%",
      color: getRandomGlassTint()
    },
    { 
      label: "Data Entries", 
      value: metrics?.content.toLocaleString() || "0", 
      icon: Database, 
      change: "+8%",
      color: getRandomGlassTint()
    },
    { 
      label: "Content Items", 
      value: metrics?.posts.toLocaleString() || "0", 
      icon: FileText, 
      change: "+15%",
      color: getRandomGlassTint()
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="relative overflow-hidden backdrop-blur-lg bg-black/20 border-white/10 hover:border-white/20 transition-all duration-300">
            <div 
              className="absolute inset-0 opacity-10 hover:opacity-20 transition-opacity duration-300"
              style={{ backgroundColor: stat.color }}
            />
            <div className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-gradient-to-r from-white/5 to-white/10">
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <span className="text-sm" style={{ color: stat.color }}>{stat.change}</span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-white/90">{stat.label}</h3>
                <p className="text-2xl font-bold mt-2 bg-clip-text text-transparent" 
                   style={{ backgroundImage: `linear-gradient(to right, ${stat.color}, white)` }}>
                  {stat.value}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};