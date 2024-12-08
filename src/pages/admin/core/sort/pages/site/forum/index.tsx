import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ForumCategories from "@/components/forum/ForumCategories";
import ForumThreads from "@/components/forum/ForumThreads";
import { ProtectedRoute } from "@/features/auth";

const Forum = () => {
  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Forum</h1>
        <Card className="p-6">
          <Tabs defaultValue="threads">
            <TabsList>
              <TabsTrigger value="threads">Threads</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
            </TabsList>
            <TabsContent value="threads">
              <ForumThreads />
            </TabsContent>
            <TabsContent value="categories">
              <ForumCategories categories={[]} isLoading={false} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </ProtectedRoute>
  );
};

export default Forum;