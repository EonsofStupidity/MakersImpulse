import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { session_id } = await req.json()

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get session details
    const { data: session, error: sessionError } = await supabase
      .from('import_sessions')
      .select('*')
      .eq('id', session_id)
      .single()

    if (sessionError) throw sessionError

    // Delete imported data
    const { error: deleteError } = await supabase
      .from(session.target_table)
      .delete()
      .eq('import_session_id', session_id)

    if (deleteError) throw deleteError

    // Update session status
    const { error: updateError } = await supabase
      .from('import_sessions')
      .update({ status: 'rolled_back' })
      .eq('id', session_id)

    if (updateError) throw updateError

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})