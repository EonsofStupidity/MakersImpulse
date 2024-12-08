import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { name, accessLevel } = await req.json()
    const { data: { user } } = await supabaseClient.auth.getUser(req.headers.get('Authorization')?.split(' ')[1] ?? '')

    if (!user) throw new Error('Unauthorized')

    // Generate API key and secret
    const apiKey = crypto.randomUUID()
    const apiSecret = Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    // Store in database
    const { data, error } = await supabaseClient
      .from('api_credentials')
      .insert({
        user_id: user.id,
        name,
        api_key: apiKey,
        api_secret: apiSecret,
        access_level: accessLevel,
        enabled: true
      })
      .select()
      .single()

    if (error) throw error

    console.log(`API key generated for user ${user.id}`)

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error generating API key:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})