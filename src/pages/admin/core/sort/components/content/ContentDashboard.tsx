import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Folder, List, Plus, Trash, Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContentList from "@/components/admin/cms/ContentList";
import CategoryList from "@/components/admin/cms/CategoryList";

const ContentDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Content Management</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Content
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="space-y-4">
        <TabsList>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <Folder className="h-4 w-4" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            Media
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <Card className="p-6">
            <ContentList />
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card className="p-6">
            <CategoryList />
          </Card>
        </TabsContent>

        <TabsContent value="media">
          <Card className="p-6">
            {/* Media library component will go here */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentDashboard;