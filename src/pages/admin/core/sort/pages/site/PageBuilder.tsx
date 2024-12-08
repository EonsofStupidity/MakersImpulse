import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { useSession } from '@supabase/auth-helpers-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import PageEditor from '@/components/builder/PageEditor'; // Fixed import
import { useToast } from '@/components/ui/use-toast';
import { Plus } from 'lucide-react';

const PageBuilder = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!session) {
    navigate('/auth');
    return null;
  }

  const handleCreatePage = () => {
    toast({
      title: "Page Created",
      description: "Your new page has been created successfully.",
    });
    // Additional page creation logic here
  };

  return (
    <ErrorBoundary>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Page Builder</h1>
          <Button onClick={handleCreatePage}>
            <Plus className="mr-2 h-4 w-4" /> Create New Page
          </Button>
        </div>

        <Card className="p-6">
          <Suspense fallback={<LoadingSpinner />}>
            <PageEditor />
          </Suspense>
        </Card>
      </div>
    </ErrorBoundary>
  );
};

export default PageBuilder;