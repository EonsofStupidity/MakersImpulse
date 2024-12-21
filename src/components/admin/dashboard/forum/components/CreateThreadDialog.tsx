import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { NewThread } from '@/types/forum';

interface CreateThreadDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateThread: (thread: NewThread) => void;
  isCreating: boolean;
}

export const CreateThreadDialog: React.FC<CreateThreadDialogProps> = ({
  isOpen,
  onOpenChange,
  onCreateThread,
  isCreating
}) => {
  const [newThread, setNewThread] = useState<NewThread>({ title: '', content: '' });

  const handleCreateThread = () => {
    if (!newThread.title || !newThread.content) {
      toast.error('Please fill in all fields');
      return;
    }
    onCreateThread(newThread);
    setNewThread({ title: '', content: '' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-neon-cyan/20 text-white border border-neon-cyan/50 hover:bg-neon-cyan/30">
          <MessageSquare className="w-4 h-4 mr-2" />
          New Thread
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white">Create New Thread</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-white">Title</Label>
            <Input
              id="title"
              value={newThread.title}
              onChange={(e) => setNewThread(prev => ({ ...prev, title: e.target.value }))}
              className="bg-black/20 border-white/10"
            />
          </div>
          <div>
            <Label htmlFor="content" className="text-white">Content</Label>
            <Textarea
              id="content"
              value={newThread.content}
              onChange={(e) => setNewThread(prev => ({ ...prev, content: e.target.value }))}
              className="bg-black/20 border-white/10 min-h-[100px]"
            />
          </div>
          <Button 
            onClick={handleCreateThread}
            className="w-full bg-neon-cyan/20 text-white border border-neon-cyan/50 hover:bg-neon-cyan/30"
            disabled={isCreating}
          >
            {isCreating ? 'Creating...' : 'Create Thread'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};