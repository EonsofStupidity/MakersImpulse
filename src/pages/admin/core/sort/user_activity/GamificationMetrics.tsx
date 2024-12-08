import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { supabase } from "@/integrations/supabase/client";

export const GamificationMetrics = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["gamification-metrics"],
    queryFn: async () => {
      const [pointsData, achievementsData, engagementData] = await Promise.all([
        supabase
          .from('user_activity_points')
          .select('points, created_at')
          .order('created_at', { ascending: true }),
        supabase
          .from('user_achievements')
          .select('completed_at')
          .order('completed_at', { ascending: true }),
        supabase
          .from('profiles')
          .select('login_streak, total_points')
          .order('total_points', { ascending: false })
      ]);

      return {
        pointsData: pointsData.data,
        achievementsData: achievementsData.data,
        engagementData: engagementData.data
      };
    }
  });

  if (isLoading) return <div>Loading metrics...</div>;

  const processedData = metrics?.pointsData?.map((point) => ({
    date: new Date(point.created_at).toLocaleDateString(),
    points: point.points
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Total Points Awarded</h3>
          <div className="text-3xl font-bold">
            {metrics?.pointsData?.reduce((acc, curr) => acc + curr.points, 0)}
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Achievements Unlocked</h3>
          <div className="text-3xl font-bold">
            {metrics?.achievementsData?.length || 0}
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Active Users</h3>
          <div className="text-3xl font-bold">
            {metrics?.engagementData?.filter(user => user.login_streak > 0).length || 0}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Points Distribution Over Time</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="points" 
                stroke="#8884d8" 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};