import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { generateBackupCodes } from '../utils/backup-codes.ts'

serve(async (req) => {
  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { user_id } = await req.json()

    // Generate new backup codes
    const backupCodes = generateBackupCodes()

    // Store the new backup codes
    const { error: updateError } = await supabaseClient
      .from('profiles')
      .update({
        backup_codes: backupCodes
      })
      .eq('id', user_id)

    if (updateError) throw updateError

    return new Response(
      JSON.stringify({ backupCodes }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }
})