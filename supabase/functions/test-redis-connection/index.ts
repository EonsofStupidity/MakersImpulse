import { createClient } from 'redis'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { host, port, password } = await req.json()
    
    console.log('Testing Redis connection:', { host, port })

    const client = createClient({
      socket: {
        host,
        port: parseInt(port),
      },
      password: password || undefined,
    })

    client.on('error', err => console.error('Redis Client Error:', err))

    await client.connect()
    console.log('Successfully connected to Redis')
    await client.disconnect()

    return new Response(
      JSON.stringify({ success: true, message: 'Connection successful' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Redis connection error:', error)
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})