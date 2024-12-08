import { useEffect, useState } from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const DailyPointsProgress = () => {
  const session = useSession();
  const DAILY_POINTS_CAP = 100; // Maximum points per day

  const { data: dailyPoints } = useQuery({
    queryKey: ['daily-points', session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('daily_point_totals')
        .select('points_earned')
        .eq('user_id', session?.user?.id)
        .eq('date', new Date().toISOString().split('T')[0])
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data?.points_earned || 0;
    },
    enabled: !!session?.user?.id,
    refetchInterval: 60000 // Refetch every minute
  });

  const progressPercentage = ((dailyPoints || 0) / DAILY_POINTS_CAP) * 100;

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">Daily Points Progress</h3>
        <span className="text-sm text-muted-foreground">
          {dailyPoints || 0} / {DAILY_POINTS_CAP}
        </span>
      </div>
      <Progress value={progressPercentage} className="h-2" />
      {progressPercentage >= 100 && (
        <p className="text-sm text-muted-foreground mt-2">
          Daily point cap reached! Come back tomorrow for more points.
        </p>
      )}
    </Card>
  );
};