import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import type { BaseContent } from '../types/cms';

interface ContentPreviewProps {
  content: BaseContent;
  isOpen: boolean;
  onClose: () => void;
}

export const ContentPreview: React.FC<ContentPreviewProps> = ({
  content,
  isOpen,
  onClose
}) => {
  const [activeView, setActiveView] = React.useState<'desktop' | 'mobile'>('desktop');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [content]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-[50vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      );
    }

    switch (content.type) {
      case 'page':
        return (
          <div className="prose prose-invert max-w-none">
            <h1>{content.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: content.content as string }} />
          </div>
        );
      case 'component':
        return (
          <div className="p-4 border border-white/10 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">{content.title}</h2>
            <pre className="bg-black/50 p-4 rounded overflow-auto">
              {JSON.stringify(content.content, null, 2)}
            </pre>
          </div>
        );
      default:
        return (
          <div className="text-center text-gray-400">
            Preview not available for this content type
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-black/90 border-white/10">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Content Preview</span>
            <Tabs value={activeView} onValueChange={(v) => setActiveView(v as 'desktop' | 'mobile')}>
              <TabsList className="bg-white/5">
                <TabsTrigger value="desktop">Desktop</TabsTrigger>
                <TabsTrigger value="mobile">Mobile</TabsTrigger>
              </TabsList>
            </Tabs>
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 overflow-y-auto"
        >
          <div 
            className={`
              transition-all duration-300 mx-auto
              ${activeView === 'mobile' ? 'max-w-[375px]' : 'max-w-none'}
            `}
          >
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 min-h-[200px]">
              {renderContent()}
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};