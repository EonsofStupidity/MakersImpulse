import { Card } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const GLASS_TINT_COLORS = ['#4efc03', '#ebfc03', '#03fcf8', '#d10fcb'];
const getRandomGlassTint = () => GLASS_TINT_COLORS[Math.floor(Math.random() * GLASS_TINT_COLORS.length)];

export const ActivitySection = () => {
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
  );
};