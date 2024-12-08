import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface CyberpunkBlogViewerProps {
  content: string;
  isOpen: boolean;
  onClose: () => void;
}

const CyberpunkBlogViewer: React.FC<CyberpunkBlogViewerProps> = ({
  content,
  isOpen,
  onClose
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down'>('down');

  // Split content into paragraphs
  const paragraphs = content.split('\n').filter(p => p.trim());

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const scrollAmount = 100;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case ' ':
        case 'ArrowDown':
          setDirection('down');
          setScrollPosition(prev => Math.min(prev + scrollAmount, containerRef.current?.scrollHeight || 0));
          break;
        case 'ArrowUp':
          setDirection('up');
          setScrollPosition(prev => Math.max(prev - scrollAmount, 0));
          break;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      setDirection(e.deltaY > 0 ? 'down' : 'up');
      setScrollPosition(prev => {
        const newPos = prev + e.deltaY;
        return Math.max(0, Math.min(newPos, containerRef.current?.scrollHeight || 0));
      });
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyPress);
      window.addEventListener('wheel', handleWheel);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg"
        >
          <div className="relative w-full max-w-6xl h-[85vh] mx-4">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
              <span className="ml-2 text-sm">ESC to close</span>
            </button>

            {/* Cyberpunk container */}
            <div 
              ref={containerRef}
              className="relative w-full h-full overflow-hidden rounded-lg border-4 border-[#ff0abe] shadow-[0_0_20px_rgba(255,10,190,0.3)]"
              style={{
                backgroundImage: `url('/lovable-uploads/cd680773-d78b-43b2-b74e-f6dbcebd652b.png')`,
                backgroundSize: '400px',
                backgroundRepeat: 'repeat',
              }}
            >
              {/* Tube border effect */}
              <div className="absolute inset-0 border-8 border-black/20 rounded-lg backdrop-blur-sm" />
              
              {/* Content container */}
              <div 
                className="relative h-full overflow-hidden p-8"
                style={{ 
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(20,20,20,0.95) 100%)'
                }}
              >
                <div 
                  className="relative h-full overflow-hidden"
                  style={{ transform: `translateY(-${scrollPosition}px)` }}
                >
                  {paragraphs.map((paragraph, index) => (
                    <motion.div
                      key={index}
                      initial={{ 
                        opacity: 0,
                        y: direction === 'down' ? 50 : -50
                      }}
                      animate={{ 
                        opacity: 1,
                        y: 0
                      }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1
                      }}
                      className="mb-6 text-lg text-white/90 leading-relaxed"
                    >
                      {paragraph}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Scroll indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <div className="px-4 py-2 bg-black/60 rounded-full text-white/80 text-sm">
                  Use ↑↓ arrows or spacebar to navigate
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CyberpunkBlogViewer;