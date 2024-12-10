import { motion } from "framer-motion";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Users, FileText, Activity, Zap, Radio, Cpu } from 'lucide-react';
import { cn } from "@/lib/utils";

const fetchStats = async () => {
  const [users, posts, activity] = await Promise.all([
    supabase.from('profiles').select('count').single(),
    supabase.from('blog_posts').select('count').single(),
    supabase.from('user_activity').select('count').single()
  ]);

  return {
    users: users.data?.count || 0,
    posts: posts.data?.count || 0,
    activity: activity.data?.count || 0,
    performance: 98.5,
    system: 'Optimal',
    monitoring: 'Active'
  };
};

export const StatsCards = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: fetchStats,
    refetchInterval: 30000
  });

  const cards = [
    { 
      title: 'Total Users', 
      value: stats?.users || 0,
      icon: Users,
      color: 'from-cyber-yellow/20 to-cyber-yellow/5'
    },
    { 
      title: 'Total Posts', 
      value: stats?.posts || 0,
      icon: FileText,
      color: 'from-cyber-pink/20 to-cyber-pink/5'
    },
    { 
      title: 'User Activities', 
      value: stats?.activity || 0,
      icon: Activity,
      color: 'from-cyber-green/20 to-cyber-green/5'
    },
    { 
      title: 'Performance', 
      value: `${stats?.performance || 0}%`,
      icon: Zap,
      color: 'from-cyber-purple/20 to-cyber-purple/5'
    },
    { 
      title: 'System Status', 
      value: stats?.system || 'Loading...',
      icon: Cpu,
      color: 'from-cyber-neon/20 to-cyber-neon/5'
    },
    { 
      title: 'Monitoring', 
      value: stats?.monitoring || 'Loading...',
      icon: Radio,
      color: 'from-cyber-yellow/20 to-cyber-pink/5'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={cn(
              "relative p-6 rounded-xl overflow-hidden",
              "bg-black/40 backdrop-blur-sm border border-white/10",
              "group hover:border-white/20 transition-all duration-300",
              "before:content-[''] before:absolute before:inset-0 before:bg-cyber-texture before:opacity-5",
              "after:content-[''] after:absolute after:inset-0 after:bg-scratch-overlay after:opacity-[0.02]"
            )}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-3 rounded-lg bg-gradient-to-br",
                  card.color
                )}>
                  <Icon className="w-6 h-6 text-white animate-cyber-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white group-hover:text-cyber-neon transition-colors">
                    {isLoading ? (
                      <div className="h-6 w-16 bg-white/10 rounded animate-pulse" />
                    ) : (
                      card.value.toLocaleString()
                    )}
                  </h3>
                  <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">{card.title}</p>
                </div>
              </div>
            </div>
            <div className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-100",
              "transition-opacity duration-300 bg-gradient-to-r",
              card.color
            )} />
          </motion.div>
        );
      })}
    </div>
  );
};