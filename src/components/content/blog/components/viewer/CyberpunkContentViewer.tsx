import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronUp, ChevronDown } from 'lucide-react';
import { createPortal } from 'react-dom';

interface CyberpunkContentViewerProps {
  content: string;
  isOpen: boolean;
  onClose: () => void;
}

const CyberpunkContentViewer: React.FC<CyberpunkContentViewerProps> = ({
  content,
  isOpen,
  onClose
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const paragraphs = content.split('\n').filter(p => p.trim());

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const scrollAmount = 100;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
        case ' ':
          setScrollPosition(prev => Math.min(prev + scrollAmount, contentRef.current?.scrollHeight || 0));
          break;
        case 'ArrowUp':
          setScrollPosition(prev => Math.max(prev - scrollAmount, 0));
          break;
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl"
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

          {/* Main content container with cyberpunk styling */}
          <div 
            className="relative w-full h-full rounded-lg border-4 border-[#ff0abe] shadow-[0_0_20px_rgba(255,10,190,0.3)] overflow-hidden"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400")',
              backgroundSize: '400px',
              backgroundRepeat: 'repeat',
            }}
          >
            {/* Tube border effect */}
            <div className="absolute inset-0 border-8 border-black/20 rounded-lg backdrop-blur-sm" />
            
            {/* Content container */}
            <div 
              ref={contentRef}
              className="relative h-full overflow-hidden p-8"
              style={{ 
                background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(20,20,20,0.95) 100%)'
              }}
            >
              <div 
                className="relative h-full"
                style={{ transform: `translateY(-${scrollPosition}px)` }}
              >
                {paragraphs.map((paragraph, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="mb-6 text-lg text-white/90 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ))}
              </div>
            </div>

            {/* Navigation indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
              <div className="flex items-center gap-4 px-4 py-2 bg-black/60 rounded-full text-white/80 text-sm">
                <ChevronUp className="w-4 h-4" />
                <span>↑↓ arrows or spacebar</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default CyberpunkContentViewer;