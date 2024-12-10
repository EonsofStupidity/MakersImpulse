import React, { createContext, useContext, useState } from 'react';

interface AdminSidebarContextType {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  shortcuts: string[];
  addShortcut: (id: string) => void;
  removeShortcut: (id: string) => void;
}

const AdminSidebarContext = createContext<AdminSidebarContextType | undefined>(undefined);

export const AdminSidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [shortcuts, setShortcuts] = useState<string[]>([]);

  const addShortcut = (id: string) => {
    if (!shortcuts.includes(id)) {
      setShortcuts([...shortcuts, id]);
    }
  };

  const removeShortcut = (id: string) => {
    setShortcuts(shortcuts.filter(s => s !== id));
  };

  return (
    <AdminSidebarContext.Provider value={{ 
      isOpen, 
      setIsOpen, 
      shortcuts, 
      addShortcut, 
      removeShortcut 
    }}>
      {children}
    </AdminSidebarContext.Provider>
  );
};

export const useAdminSidebar = () => {
  const context = useContext(AdminSidebarContext);
  if (context === undefined) {
    throw new Error('useAdminSidebar must be used within an AdminSidebarProvider');
  }
  return context;
};