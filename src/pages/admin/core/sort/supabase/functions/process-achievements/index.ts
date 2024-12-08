import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Achievement {
  id: string;
  name: string;
  requirements: {
    type: string;
    target_value: number;
    criteria?: any;
  };
  points: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { user_id, activity_type, metadata } = await req.json()

    // Fetch all achievements
    const { data: achievements } = await supabaseClient
      .from('achievements')
      .select('*')
      .order('points', { ascending: false })

    if (!achievements) {
      throw new Error('No achievements found')
    }

    // Process each achievement
    for (const achievement of achievements) {
      const { requirements } = achievement

      // Check if user already has this achievement
      const { data: existingAchievement } = await supabaseClient
        .from('user_achievements')
        .select('*')
        .eq('user_id', user_id)
        .eq('achievement_id', achievement.id)
        .single()

      if (existingAchievement) continue

      // Check achievement requirements
      let isAchieved = false
      switch (requirements.type) {
        case 'activity_count':
          const { count } = await supabaseClient
            .from('activity_feed')
            .select('*', { count: 'exact' })
            .eq('user_id', user_id)
            .eq('activity_type', requirements.criteria.type)
          isAchieved = count >= requirements.target_value
          break

        case 'points_total':
          const { data: points } = await supabaseClient
            .from('user_activity_points')
            .select('points')
            .eq('user_id', user_id)
          const totalPoints = points?.reduce((sum, p) => sum + p.points, 0) || 0
          isAchieved = totalPoints >= requirements.target_value
          break

        // Add more achievement types as needed
      }

      // Award achievement if requirements met
      if (isAchieved) {
        await supabaseClient.from('user_achievements').insert({
          user_id,
          achievement_id: achievement.id,
          completed_at: new Date().toISOString(),
        })

        // Add points for earning achievement
        await supabaseClient.from('user_activity_points').insert({
          user_id,
          activity_type: 'achievement_earned',
          points: achievement.points,
          metadata: { achievement_id: achievement.id }
        })

        // Create notification
        await supabaseClient.from('notifications').insert({
          user_id,
          type: 'achievement_earned',
          title: 'New Achievement Unlocked!',
          message: `You've earned the "${achievement.name}" achievement!`,
          metadata: { achievement_id: achievement.id }
        })
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error processing achievements:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})