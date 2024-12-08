import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface FileUploadProps {
  onFileUpload: (fileUrl: string) => void;
  context?: string;
  acceptedTypes?: Record<string, string[]>;
  maxSize?: number;
  visibility?: 'public' | 'private';
}

export const FileUpload = ({ 
  onFileUpload, 
  context = 'general',
  acceptedTypes = {
    'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    'text/csv': ['.csv'],
    'application/json': ['.json']
  },
  maxSize = 5 * 1024 * 1024, // 5MB default
  visibility = 'public'
}: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('context', context);
      formData.append('visibility', visibility);

      const { data, error } = await supabase.functions.invoke('upload-file', {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'File uploaded successfully',
      });

      onFileUpload(data.url);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload file. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  }, [context, visibility, onFileUpload, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes,
    maxSize,
    multiple: false,
    disabled: isUploading
  });

  return (
    <Card
      {...getRootProps()}
      className={`p-8 border-2 border-dashed cursor-pointer transition-colors ${
        isDragActive ? 'border-primary bg-primary/5' : 'border-muted'
      } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        {isUploading ? (
          <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
        ) : (
          <Upload className="h-12 w-12 text-muted-foreground" />
        )}
        <div className="space-y-2">
          <p className="text-sm font-medium">
            {isDragActive ? 'Drop the file here' : 'Drag & drop a file here'}
          </p>
          <p className="text-xs text-muted-foreground">
            Supported formats: PNG, JPG, GIF, CSV, JSON
          </p>
        </div>
      </div>
    </Card>
  );
};