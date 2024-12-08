import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    // Calculate user rankings based on total points and achievements
    const { data: users, error } = await supabaseClient
      .from('profiles')
      .select(`
        id,
        username,
        display_name,
        avatar_url,
        total_points,
        current_level,
        achievements_count
      `)
      .order('total_points', { ascending: false })

    if (error) throw error

    // Update user rankings
    for (let i = 0; i < users.length; i++) {
      const rank = i + 1
      await supabaseClient
        .from('profiles')
        .update({ rank })
        .eq('id', users[i].id)
    }

    // Refresh materialized view for leaderboard
    await supabaseClient.rpc('refresh_leaderboard_view')

    return new Response(JSON.stringify({ success: true, updated: users.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error updating leaderboard:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})