import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import * as OTPAuth from 'https://esm.sh/otpauth@9.1.4'

serve(async (req) => {
  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { email, password, token, isRecoveryCode = false } = await req.json()

    // First, verify the email/password
    const { data: authData, error: authError } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) throw authError

    // Get the user's 2FA secret and device info
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('two_factor_secret, backup_codes')
      .eq('id', authData.user.id)
      .single()

    if (profileError) throw profileError

    // Check for trusted device
    const deviceHash = await generateDeviceHash(req.headers.get('user-agent') || '');
    const { data: trustedDevice } = await supabaseClient
      .from('trusted_devices')
      .select('*')
      .eq('user_id', authData.user.id)
      .eq('device_hash', deviceHash)
      .gte('expires_at', new Date().toISOString())
      .maybeSingle();

    if (trustedDevice) {
      return new Response(
        JSON.stringify({ session: authData.session }),
        { headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (isRecoveryCode) {
      // Check recovery codes
      const { data: recoveryCode, error: recoveryError } = await supabaseClient
        .from('recovery_codes')
        .select('*')
        .eq('user_id', authData.user.id)
        .eq('code', token)
        .eq('used', false)
        .single();

      if (recoveryError || !recoveryCode) {
        throw new Error('Invalid recovery code');
      }

      // Mark recovery code as used
      await supabaseClient
        .from('recovery_codes')
        .update({ used: true, used_at: new Date().toISOString() })
        .eq('id', recoveryCode.id);

      return new Response(
        JSON.stringify({ session: authData.session }),
        { headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Verify the TOTP token
    const totp = new OTPAuth.TOTP({
      issuer: "MakerNetwork",
      label: "2FA",
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret: profile.two_factor_secret
    })

    const isValid = totp.validate({ token, window: 1 }) !== null

    if (!isValid) {
      throw new Error('Invalid verification code')
    }

    return new Response(
      JSON.stringify({ session: authData.session }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }
})

async function generateDeviceHash(userAgent: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(userAgent);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}