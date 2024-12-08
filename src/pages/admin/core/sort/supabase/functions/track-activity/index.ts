import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const POINTS_MAP = {
  forum_post: 5,
  forum_reply: 3,
  build_submitted: 10,
  build_liked: 2,
  profile_updated: 1,
  achievement_earned: 15,
  daily_login: 1,
  mentor_session: 8,
  helpful_answer: 5
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { user_id, activity_type, metadata } = await req.json()
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Record activity
    const { data: activity, error: activityError } = await supabaseClient
      .from('activity_feed')
      .insert({
        user_id,
        activity_type,
        metadata,
        content: getActivityContent(activity_type, metadata)
      })
      .select()
      .single()

    if (activityError) throw activityError

    // Award points
    if (POINTS_MAP[activity_type]) {
      await supabaseClient
        .from('user_activity_points')
        .insert({
          user_id,
          activity_type,
          points: POINTS_MAP[activity_type],
          metadata
        })

      // Update user's total points
      const { data: points } = await supabaseClient
        .from('user_activity_points')
        .select('points')
        .eq('user_id', user_id)

      const totalPoints = points?.reduce((sum, p) => sum + p.points, 0) || 0

      await supabaseClient
        .from('profiles')
        .update({ 
          total_points: totalPoints,
          current_level: Math.floor(totalPoints / 100) + 1
        })
        .eq('id', user_id)
    }

    // Trigger achievement processing
    await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/process-achievements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`
      },
      body: JSON.stringify({ user_id, activity_type, metadata })
    })

    return new Response(JSON.stringify({ success: true, activity }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error tracking activity:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})

function getActivityContent(type: string, metadata: any): string {
  switch (type) {
    case 'forum_post':
      return `Created a new forum post: "${metadata.title}"`
    case 'forum_reply':
      return `Replied to a forum post`
    case 'build_submitted':
      return `Submitted a new build: "${metadata.build_name}"`
    case 'build_liked':
      return `Liked a build`
    case 'achievement_earned':
      return `Earned the "${metadata.achievement_name}" achievement`
    default:
      return `Performed ${type} activity`
  }
}