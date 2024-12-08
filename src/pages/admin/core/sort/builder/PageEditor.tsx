import { useState, Suspense } from 'react';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const PageEditor = () => {
  const { toast } = useToast();
  const [pageTitle, setPageTitle] = useState("");
  const [pageContent, setPageContent] = useState("");

  const handleSubmit = async () => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user?.id) {
        throw new Error("You must be logged in to create a page");
      }

      const slug = pageTitle.toLowerCase().replace(/\s+/g, "-");
      
      const { error } = await supabase
        .from("builder_pages")
        .insert({
          title: pageTitle,
          slug: slug,
          content: { blocks: [{ type: 'text', content: pageContent }] },
          style_config: {},
          user_id: user.data.user.id,
          is_published: false
        });
      
      if (error) throw error;
      toast({
        title: "Success",
        description: "Page saved successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save page. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <ErrorBoundary>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Edit Page</h2>
        <div className="mb-4">
          <Input
            placeholder="Page Title"
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Textarea
            placeholder="Page Content"
            value={pageContent}
            onChange={(e) => setPageContent(e.target.value)}
          />
        </div>
        <Button onClick={handleSubmit}>Save Page</Button>
      </div>
    </ErrorBoundary>
  );
};

export default PageEditor;