import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Archive } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import type { CMSContent } from '../../core/types';

interface ContentListItemProps {
  item: CMSContent;
  onEdit: (content: CMSContent) => void;
}

export const ContentListItem = ({ item, onEdit }: ContentListItemProps) => {
  const getStatusColor = (status: CMSContent['status']) => {
    switch (status) {
      case 'published':
        return 'bg-green-500/10 text-green-500';
      case 'draft':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'archived':
        return 'bg-gray-500/10 text-gray-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const handleArchive = async () => {
    try {
      const { error } = await supabase
        .from('cms_content')
        .update({ status: 'archived' })
        .eq('id', item.id);

      if (error) throw error;
      
      toast.success('Content archived successfully');
    } catch (err) {
      console.error('Error archiving content:', err);
      toast.error('Failed to archive content');
    }
  };

  return (
    <Card key={item.id} className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{item.title}</h3>
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date(item.updated_at).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(item.status)}>
            {item.status}
          </Badge>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onEdit(item)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleArchive}
          >
            <Archive className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};