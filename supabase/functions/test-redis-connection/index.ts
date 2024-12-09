import { connect } from "https://deno.land/x/redis@v0.29.0/mod.ts";
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { host, port, password } = await req.json();
    
    console.log('Testing Redis connection:', { host, port });

    const redis = await connect({
      hostname: host,
      port: parseInt(port),
      password: password || undefined,
    });

    // Test the connection
    await redis.ping();
    console.log('Successfully connected to Redis');
    await redis.close();

    return new Response(
      JSON.stringify({ success: true, message: 'Connection successful' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Redis connection error:', error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});