import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Edit, Flag, Trash2 } from 'lucide-react';
import { ForumThread } from '@/types/forum';

interface ThreadsTableProps {
  threads: ForumThread[];
  onDeleteThread: (id: string) => void;
  isDeleting: boolean;
}

export const ThreadsTable: React.FC<ThreadsTableProps> = ({
  threads,
  onDeleteThread,
  isDeleting
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Replies</TableHead>
          <TableHead>Flags</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {threads?.map((thread) => (
          <TableRow key={thread.id}>
            <TableCell className="font-medium text-white">{thread.title}</TableCell>
            <TableCell>{thread.author?.display_name || 'Unknown'}</TableCell>
            <TableCell>{thread.replies?.[0]?.count || 0}</TableCell>
            <TableCell>{thread.flags?.[0]?.count || 0}</TableCell>
            <TableCell>
              {new Date(thread.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-neon-cyan"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-red-500"
                  onClick={() => onDeleteThread(thread.id)}
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-yellow-500"
                >
                  <Flag className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};