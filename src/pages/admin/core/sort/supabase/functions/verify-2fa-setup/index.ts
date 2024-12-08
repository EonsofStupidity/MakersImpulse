import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import * as OTPAuth from 'https://esm.sh/otpauth@9.1.4'
import { generateBackupCodes } from '../utils/backup-codes.ts'

serve(async (req) => {
  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { user_id, secret, token } = await req.json()

    // Verify the token
    const totp = new OTPAuth.TOTP({
      issuer: "MakerNetwork",
      label: "2FA",
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret: secret
    })

    const isValid = totp.validate({ token, window: 1 }) !== null

    if (!isValid) {
      throw new Error('Invalid verification code')
    }

    // Generate backup codes
    const backupCodes = generateBackupCodes()

    // Enable 2FA and store backup codes
    const { error: updateError } = await supabaseClient
      .from('profiles')
      .update({
        two_factor_enabled: true,
        backup_codes: backupCodes
      })
      .eq('id', user_id)

    if (updateError) throw updateError

    return new Response(
      JSON.stringify({ success: true, backupCodes }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }
})