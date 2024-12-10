import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../shared/ui/Navigation';
import { Toaster } from '@/components/ui/sonner';

export const RootLayout = () => {
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
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};