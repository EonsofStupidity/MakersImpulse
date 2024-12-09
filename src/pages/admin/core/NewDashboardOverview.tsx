import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, ChartBar, Database, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const NewDashboardOverview = () => {
  const { data: metrics } = useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: async () => {
      const [
        { count: usersCount }, 
        { count: sessionsCount },
        { count: contentCount },
        { count: postsCount }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact' }),
        supabase.from('active_2fa_sessions').select('*', { count: 'exact' }),
        supabase.from('cms_content').select('*', { count: 'exact' }),
        supabase.from('blog_posts').select('*', { count: 'exact' })
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
      change: "+12%" 
    },
    { 
      label: "Active Sessions", 
      value: metrics?.sessions.toLocaleString() || "0", 
      icon: ChartBar, 
      change: "+5%" 
    },
    { 
      label: "Data Entries", 
      value: metrics?.content.toLocaleString() || "0", 
      icon: Database, 
      change: "+8%" 
    },
    { 
      label: "Content Items", 
      value: metrics?.posts.toLocaleString() || "0", 
      icon: FileText, 
      change: "+15%" 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
          Dashboard Overview
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer backdrop-blur-sm bg-card/50">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{stat.change}</span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{stat.label}</h3>
                <p className="text-2xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                  {stat.value}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Activity Overview</h3>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            [Activity Chart Placeholder]
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Actions</h3>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            [Recent Actions List Placeholder]
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">User Distribution</h3>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            [User Distribution Chart Placeholder]
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">System Health</h3>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            [System Health Metrics Placeholder]
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Storage Usage</h3>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            [Storage Usage Chart Placeholder]
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NewDashboardOverview;
