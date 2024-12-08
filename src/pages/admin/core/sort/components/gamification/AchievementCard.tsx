import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";

export const AchievementCard = () => {
  const session = useSession();

  const { data: achievements } = useQuery({
    queryKey: ["user-achievements"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_achievements")
        .select(`
          achievement:achievements (
            name,
            description,
            badge_icon,
            icon_color,
            category
          )
        `)
        .eq('user_id', session?.user?.id)
        .order('completed_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Recent Achievements</h3>
        </div>
        <div className="space-y-4">
          {achievements?.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div
                className="p-2 rounded-full"
                style={{ backgroundColor: `${achievement.achievement.icon_color}20` }}
              >
                <Award 
                  className="w-4 h-4"
                  style={{ color: achievement.achievement.icon_color }}
                />
              </div>
              <div>
                <h4 className="font-medium">{achievement.achievement.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {achievement.achievement.description}
                </p>
                <Badge variant="secondary" className="mt-1">
                  {achievement.achievement.category}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};