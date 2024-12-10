import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { ImportWizard } from "@/components/admin/components/csv/ImportWizard";
import { toast } from "sonner";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { FileJson, Package, Paintbrush } from 'lucide-react';

interface ImportSession {
  id: string;
  type: 'page' | 'theme' | 'template';
  status: string;
  created_at: string;
  metadata: any;
}

export const ImportManager = () => {
  const [activeTab, setActiveTab] = useState<string>('pages');

  const { data: importSessions, isLoading } = useQuery({
    queryKey: ['import-sessions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('import_sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Failed to load import sessions');
        throw error;
      }

      return data as ImportSession[];
    }
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          Import Manager
        </h1>
        <p className="text-muted-foreground">
          Import and manage pages, themes, and templates
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-black/20 backdrop-blur-sm">
          <TabsTrigger 
            value="pages"
            className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-500"
          >
            <FileJson className="w-4 h-4 mr-2" />
            Pages
          </TabsTrigger>
          <TabsTrigger 
            value="themes"
            className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-500"
          >
            <Paintbrush className="w-4 h-4 mr-2" />
            Themes
          </TabsTrigger>
          <TabsTrigger 
            value="templates"
            className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-500"
          >
            <Package className="w-4 h-4 mr-2" />
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pages">
          <Card className="p-6 bg-black/40 border-purple-500/20">
            <ImportWizard 
              type="page"
              acceptedTypes={['.json', '.tsx', '.jsx']}
              onImport={(files) => console.log('Importing pages:', files)}
            />
          </Card>
        </TabsContent>

        <TabsContent value="themes">
          <Card className="p-6 bg-black/40 border-pink-500/20">
            <ImportWizard 
              type="theme"
              acceptedTypes={['.json', '.css']}
              onImport={(files) => console.log('Importing themes:', files)}
            />
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card className="p-6 bg-black/40 border-cyan-500/20">
            <ImportWizard 
              type="template"
              acceptedTypes={['.json']}
              onImport={(files) => console.log('Importing templates:', files)}
            />
          </Card>
        </TabsContent>
      </Tabs>

      {isLoading ? (
        <Card className="p-6 bg-black/40">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-white/10 rounded w-1/4"></div>
            <div className="h-4 bg-white/10 rounded w-1/2"></div>
          </div>
        </Card>
      ) : importSessions?.length ? (
        <Card className="p-6 bg-black/40">
          <h3 className="text-lg font-semibold mb-4">Recent Imports</h3>
          <div className="space-y-4">
            {importSessions.map((session) => (
              <div 
                key={session.id}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5"
              >
                <div>
                  <p className="font-medium">{session.type}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(session.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  session.status === 'completed' 
                    ? 'bg-green-500/20 text-green-500' 
                    : 'bg-yellow-500/20 text-yellow-500'
                }`}>
                  {session.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      ) : null}
    </div>
  );
};

export default ImportManager;