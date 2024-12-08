import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import ImageCarousel from "@/components/shared/content-blocks/ImageCarousel";

interface BlogPostContentProps {
  title: string;
  content: string;
  onReadMore: () => void;
  hasMoreContent: boolean;
  images?: string[];
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({
  title,
  content,
  onReadMore,
  hasMoreContent,
  images = [],
}) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const handleContentClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <div 
        className="flex-1 max-w-full overflow-hidden cursor-pointer"
        onClick={handleContentClick}
      >
        <h3 className="font-bold text-4xl text-white mb-4 group-hover:text-[#ff0abe] transition-colors duration-300 line-clamp-2">
          {title}
        </h3>
        
        <div className="text-white/80 mb-6 prose prose-invert max-w-none">
          <div 
            className="line-clamp-3 break-words whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: content }} 
          />
          {hasMoreContent && (
            <Button 
              variant="link" 
              className="text-[#ff0abe] hover:text-[#ff0abe]/80 pl-2"
              onClick={(e) => {
                e.stopPropagation();
                onReadMore();
              }}
            >
              Read more
            </Button>
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl h-[90vh] p-0 bg-black/90 border-[#ff0abe]/20 overflow-hidden">
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 p-6">
              <h2 className="text-4xl font-bold text-white mb-6 animate-fade-in">
                {title}
              </h2>
              <div 
                className="prose prose-invert max-w-none animate-fade-in"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </ScrollArea>
            
            {images && images.length > 0 && (
              <div className="mt-auto border-t border-white/10 p-4 bg-black/60">
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className="relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105"
                      style={{
                        borderColor: currentImageIndex === index ? '#ff0abe' : 'transparent'
                      }}
                    >
                      <img 
                        src={image} 
                        alt={`Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BlogPostContent;