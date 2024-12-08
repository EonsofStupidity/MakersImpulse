import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const determineWorkflowType = (fileType: string): string => {
  if (fileType.startsWith('image/')) return 'image';
  if (fileType === 'text/csv') return 'csv';
  if (fileType === 'application/json') return 'json';
  return 'default';
};

const getBucketName = (fileType: string): string => {
  if (fileType.startsWith('image/')) {
    if (fileType.includes('blog')) return 'blog_images';
    if (fileType.includes('component')) return 'component_images';
    if (fileType.includes('featured')) return 'featured_images';
    return 'siteimgs';
  }
  return 'siteimgs'; // Default bucket
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file')
    const context = formData.get('context') // e.g., 'blog', 'component', 'featured'
    const visibility = formData.get('visibility') || 'public'

    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file uploaded' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Create Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const fileExt = file.name.split('.').pop()
    const fileName = `${crypto.randomUUID()}.${fileExt}`
    const workflowType = determineWorkflowType(file.type)
    const bucketName = getBucketName(context ? `${context}/${file.type}` : file.type)

    // Upload to appropriate bucket
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return new Response(
        JSON.stringify({ error: 'Failed to upload file' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName)

    // Store file metadata in database
    const { data: fileData, error: fileError } = await supabase
      .from('files')
      .insert({
        filename: file.name,
        file_path: fileName,
        file_type: workflowType,
        mime_type: file.type,
        size: file.size,
        bucket_name: bucketName,
        metadata: {
          context,
          visibility,
          original_name: file.name,
          url: publicUrl
        }
      })
      .select()
      .single()

    if (fileError) {
      console.error('Database error:', fileError)
      return new Response(
        JSON.stringify({ error: 'Failed to store file metadata' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Create workflow record
    const { error: workflowError } = await supabase
      .from('file_processing_workflows')
      .insert({
        file_id: fileData.id,
        workflow_type: workflowType,
        started_at: new Date().toISOString()
      })

    if (workflowError) {
      console.error('Workflow error:', workflowError)
      // Don't fail the upload if workflow creation fails
      // but log it for monitoring
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        file: fileData,
        url: publicUrl
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Server error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})