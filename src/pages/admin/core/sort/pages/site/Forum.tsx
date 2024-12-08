import { useSession } from "@supabase/auth-helpers-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ForumCategories from "@/components/forum/ForumCategories";
import ForumThreads from "@/components/forum/ForumThreads";
import DirectMessages from "@/components/forum/DirectMessages";
import ForumSearch from "@/components/forum/ForumSearch";
import UserProfile from "@/components/forum/UserProfile";
import { ProtectedRoute } from "@/features/auth";
import { useState } from "react";

const Forum = () => {
  const session = useSession();
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = (params: { query: string; dateRange?: string; category?: string; author?: string; }) => {
    // Implement search functionality
    console.log('Search params:', params);
  };

  return (
    <ProtectedRoute>
      <Card className="p-6">
        <Tabs defaultValue="threads">
          <TabsList>
            <TabsTrigger value="threads">Threads</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="messages">Direct Messages</TabsTrigger>
            <TabsTrigger value="search">Search</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="threads">
            <ForumThreads />
          </TabsContent>
          <TabsContent value="categories">
            <ForumCategories categories={categories} isLoading={isLoading} />
          </TabsContent>
          <TabsContent value="messages">
            <DirectMessages />
          </TabsContent>
          <TabsContent value="search">
            <ForumSearch onSearch={handleSearch} />
          </TabsContent>
          <TabsContent value="profile">
            <UserProfile />
          </TabsContent>
        </Tabs>
      </Card>
    </ProtectedRoute>
  );
};

export default Forum;