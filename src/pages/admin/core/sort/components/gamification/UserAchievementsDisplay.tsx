import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Award } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface Achievement {
  id: string;
  name: string;
  description: string;
  badge_icon: string;
  icon_color: string;
  category: string;
}

interface UserAchievement {
  achievement_id: string;
  completed_at: string;
  display_settings: {
    size: 'small' | 'medium' | 'large';
    animation: string;
  };
  achievement: Achievement;
}

interface SupabaseUserAchievement {
  achievement_id: string;
  completed_at: string;
  display_settings: any;
  achievement: Achievement;
}

export const UserAchievementsDisplay = ({ userId }: { userId: string }) => {
  const { data: achievements, isLoading } = useQuery({
    queryKey: ["user-achievements", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_achievements')
        .select(`
          achievement_id,
          completed_at,
          display_settings,
          achievement:achievements (*)
        `)
        .eq('user_id', userId);
      
      if (error) throw error;

      // Transform the data to ensure display_settings has the correct shape
      return (data as SupabaseUserAchievement[]).map(achievement => ({
        ...achievement,
        display_settings: {
          size: achievement.display_settings?.size || 'medium',
          animation: achievement.display_settings?.animation || 'bounce'
        }
      })) as UserAchievement[];
    }
  });

  if (isLoading) return <div>Loading achievements...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {achievements?.map((achievement) => (
        <motion.div
          key={achievement.achievement_id}
          whileHover={{ scale: 1.05 }}
          className="relative"
        >
          <Card className="p-4 flex flex-col items-center text-center">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
              style={{ backgroundColor: achievement.achievement.icon_color + '20' }}
            >
              {achievement.achievement.badge_icon === 'trophy' ? (
                <Trophy className="w-6 h-6" style={{ color: achievement.achievement.icon_color }} />
              ) : achievement.achievement.badge_icon === 'star' ? (
                <Star className="w-6 h-6" style={{ color: achievement.achievement.icon_color }} />
              ) : (
                <Award className="w-6 h-6" style={{ color: achievement.achievement.icon_color }} />
              )}
            </div>
            <h4 className="font-semibold">{achievement.achievement.name}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {achievement.achievement.description}
            </p>
            <Badge 
              variant="secondary" 
              className="mt-2"
            >
              {achievement.achievement.category}
            </Badge>
            {achievement.completed_at && (
              <div className="mt-2 text-xs text-muted-foreground">
                Completed on {new Date(achievement.completed_at).toLocaleDateString()}
              </div>
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  );
};