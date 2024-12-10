import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

export const ContentManager = () => {
  const navigate = useNavigate();
  
  const { data: content, isLoading } = useQuery({
    queryKey: ['cms-content'],
    queryFn: async () => {
      console.log('Fetching CMS content...');
      const { data, error } = await supabase
        .from('cms_content')
        .select(`
          *,
          created_by (
            display_name
          ),
          updated_by (
            display_name
          )
        `)
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error fetching content:', error);
        toast.error('Failed to load content');
        throw error;
      }

      return data;
    }
  });

  const handleCreateContent = () => {
    navigate('/admin/content-management/editor');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Content Management</h1>
        <Button 
          onClick={handleCreateContent}
          className="bg-[#26c766]/20 text-white border border-[#26c766]/50 hover:bg-[#26c766]/30"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Content
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#26c766]" />
        </div>
      ) : content?.length === 0 ? (
        <Card className="p-12 text-center bg-black/40 border-white/10">
          <p className="text-white/60">No content found. Create your first piece of content to get started.</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {content?.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group"
            >
              <Card 
                className="p-6 bg-black/40 border-white/10 hover:border-[#26c766]/50 transition-all duration-300"
                onClick={() => navigate(`/admin/content-management/editor/${item.id}`)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#26c766] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/60 mt-1">
                      Last updated by {item.updated_by?.display_name} on{' '}
                      {new Date(item.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`
                      px-2 py-1 text-xs rounded-full
                      ${item.status === 'published' ? 'bg-[#26c766]/20 text-[#26c766]' : 
                        item.status === 'draft' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-white/10 text-white/60'}
                    `}>
                      {item.status}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentManager;