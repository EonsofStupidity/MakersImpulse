import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { CreateThreadDialog } from './components/CreateThreadDialog';
import { ThreadsTable } from './components/ThreadsTable';
import { useForumManagement } from './hooks/useForumManagement';

export const ForumManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { threads, isLoading, createThread, deleteThread, isCreating, isDeleting } = useForumManagement();

  const filteredThreads = threads?.filter(thread =>
    thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    thread.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Forum Management</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search threads..." 
              className="w-64 bg-black/20 border-white/10 pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <CreateThreadDialog
            isOpen={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
            onCreateThread={(thread) => {
              createThread(thread);
              setIsCreateDialogOpen(false);
            }}
            isCreating={isCreating}
          />
        </div>
      </div>

      <Card className="bg-black/40 border-white/10">
        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center p-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-cyan"></div>
            </div>
          ) : (
            <ThreadsTable
              threads={filteredThreads || []}
              onDeleteThread={deleteThread}
              isDeleting={isDeleting}
            />
          )}
        </div>
      </Card>
    </div>
  );
};