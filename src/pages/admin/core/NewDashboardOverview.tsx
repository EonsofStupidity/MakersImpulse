import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, ChartBar, Database, FileText, Activity, Settings, HardDrive } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const GLASS_TINT_COLORS = ['#4efc03', '#ebfc03', '#03fcf8', '#d10fcb'];

const getRandomGlassTint = () => {
  return GLASS_TINT_COLORS[Math.floor(Math.random() * GLASS_TINT_COLORS.length)];
};

const NewDashboardOverview = () => {
  // Fetch actual metrics
  const { data: metrics } = useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: async () => {
      const [
        { count: usersCount }, 
        { count: sessionsCount },
        { count: contentCount },
        { count: postsCount },
        { count: activityCount }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('active_2fa_sessions').select('*', { count: 'exact', head: true }),
        supabase.from('cms_content').select('*', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
        supabase.from('user_activity').select('*', { count: 'exact', head: true })
      ]);

      return {
        users: usersCount || 0,
        sessions: sessionsCount || 0,
        content: contentCount || 0,
        posts: postsCount || 0,
        activity: activityCount || 0
      };
    }
  });

  // Fetch activity data for charts
  const { data: activityData } = useQuery({
    queryKey: ['activity-chart'],
    queryFn: async () => {
      const { data } = await supabase
        .from('user_activity')
        .select('created_at, activity_type')
        .order('created_at', { ascending: true })
        .limit(50);
      
      return data || [];
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
    },
  ];

  // Process activity data for charts
  const chartData = activityData?.reduce((acc: any[], curr: any) => {
    const date = new Date(curr.created_at).toLocaleDateString();
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ date, count: 1 });
    }
    return acc;
  }, []) || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-purple">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 backdrop-blur-lg bg-black/20 border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5" style={{ color: getRandomGlassTint() }} />
            <h3 className="text-lg font-semibold text-white/90">Activity Overview</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={getRandomGlassTint()} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={getRandomGlassTint()} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke={getRandomGlassTint()} 
                  fillOpacity={1} 
                  fill="url(#colorActivity)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-black/20 border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-neon-pink" />
            <h3 className="text-lg font-semibold text-white/90">Recent Actions</h3>
          </div>
          <div className="h-[300px] flex items-center justify-center text-white/60">
            [Recent Actions List Placeholder]
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 backdrop-blur-lg bg-black/20 border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-neon-cyan" />
            <h3 className="text-lg font-semibold text-white/90">User Distribution</h3>
          </div>
          <div className="h-[200px] flex items-center justify-center text-white/60">
            [User Distribution Chart Placeholder]
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-black/20 border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-neon-pink" />
            <h3 className="text-lg font-semibold text-white/90">System Health</h3>
          </div>
          <div className="h-[200px] flex items-center justify-center text-white/60">
            [System Health Metrics Placeholder]
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-black/20 border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <HardDrive className="w-5 h-5 text-neon-purple" />
            <h3 className="text-lg font-semibold text-white/90">Storage Usage</h3>
          </div>
          <div className="h-[200px] flex items-center justify-center text-white/60">
            [Storage Usage Chart Placeholder]
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NewDashboardOverview;
