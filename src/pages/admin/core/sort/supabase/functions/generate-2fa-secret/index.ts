import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import * as OTPAuth from 'https://esm.sh/otpauth@9.1.4'

serve(async (req) => {
  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { user_id } = await req.json()

    // Generate new TOTP secret
    const totp = new OTPAuth.TOTP({
      issuer: "MakerNetwork",
      label: "2FA",
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret: OTPAuth.Secret.generate()
    })

    // Store the secret in the database
    const { error: updateError } = await supabaseClient
      .from('profiles')
      .update({
        two_factor_secret: totp.secret.base32,
        two_factor_enabled: false
      })
      .eq('id', user_id)

    if (updateError) throw updateError

    return new Response(
      JSON.stringify({ secret: totp.secret.base32 }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }
})