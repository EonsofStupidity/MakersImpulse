import React, { useEffect } from 'react';
import { Navigation } from '../shared/ui/Navigation';
import { Toaster } from '@/components/ui/sonner';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {children}
      </main>
      <Toaster />
    </div>
  );
};