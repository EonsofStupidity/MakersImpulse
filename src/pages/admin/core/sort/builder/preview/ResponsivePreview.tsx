import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Smartphone, Tablet, Monitor } from 'lucide-react';

interface ResponsivePreviewProps {
  children: React.ReactNode;
}

export const ResponsivePreview = ({ children }: ResponsivePreviewProps) => {
  const [viewportSize, setViewportSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  const viewportStyles = {
    mobile: 'max-w-[375px]',
    tablet: 'max-w-[768px]',
    desktop: 'max-w-full'
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-2">
        <Button
          variant={viewportSize === 'mobile' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewportSize('mobile')}
        >
          <Smartphone className="h-4 w-4 mr-2" />
          Mobile
        </Button>
        <Button
          variant={viewportSize === 'tablet' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewportSize('tablet')}
        >
          <Tablet className="h-4 w-4 mr-2" />
          Tablet
        </Button>
        <Button
          variant={viewportSize === 'desktop' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewportSize('desktop')}
        >
          <Monitor className="h-4 w-4 mr-2" />
          Desktop
        </Button>
      </div>
      
      <div className="flex justify-center">
        <Card className={`transition-all duration-300 ${viewportStyles[viewportSize]}`}>
          {children}
        </Card>
      </div>
    </div>
  );
};