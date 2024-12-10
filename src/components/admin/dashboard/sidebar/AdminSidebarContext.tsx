import React, { createContext, useContext, useState } from 'react';

interface AdminSidebarContextType {
  isOpen: boolean;
  activeTab: string;
  shortcuts: string[];
  setIsOpen: (value: boolean) => void;
  setActiveTab: (tab: string) => void;
  addShortcut: (id: string) => void;
  removeShortcut: (id: string) => void;
}

const AdminSidebarContext = createContext<AdminSidebarContextType | undefined>(undefined);

export const AdminSidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
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
      activeTab,
      setIsOpen, 
      setActiveTab,
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