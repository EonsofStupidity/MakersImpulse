import { useState } from "react";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { AdminSidebar } from "./components/AdminSidebar";
import { AdminHeader } from "./components/AdminHeader";
import { QuickActionFAB } from "./components/QuickActionFAB";

type DockPosition = 'left' | 'right' | 'top' | 'bottom';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [dockPosition, setDockPosition] = useState<DockPosition>('left');

  const rotateDockPosition = () => {
    const positions: DockPosition[] = ['left', 'top', 'right', 'bottom'];
    const currentIndex = positions.indexOf(dockPosition);
    const nextIndex = (currentIndex + 1) % positions.length;
    setDockPosition(positions[nextIndex]);
  };

  const sidebarStyles = {
    left: "fixed left-0 top-14 h-[calc(100vh-3.5rem)]",
    right: "fixed right-0 top-14 h-[calc(100vh-3.5rem)]",
    top: "fixed left-0 top-14 w-screen h-16",
    bottom: "fixed left-0 bottom-0 w-screen h-16"
  };

  const contentStyles = {
    left: isSidebarCollapsed ? "ml-20" : "ml-[280px]",
    right: isSidebarCollapsed ? "mr-20" : "mr-[280px]",
    top: "mt-[7.5rem]",
    bottom: "mb-16"
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Sidebar/Dock with higher z-index */}
      <motion.aside
        initial={false}
        animate={{
          width: ['left', 'right'].includes(dockPosition) 
            ? (isSidebarCollapsed ? 80 : 280) 
            : '100%',
          height: ['top', 'bottom'].includes(dockPosition)
            ? (isSidebarCollapsed ? 64 : 280)
            : 'calc(100vh - 3.5rem)'
        }}
        className={cn(
          "lg:border-border/40 lg:bg-black/80 lg:backdrop-blur-xl z-40 lg:shadow-[0_4px_30px_rgba(0,0,0,0.1)]",
          // Mobile styles
          "md:hidden bg-gradient-to-b from-[#34ebbd]/10 via-[#fa19a7]/10 to-transparent backdrop-blur-md",
          sidebarStyles[dockPosition]
        )}
      >
        <AdminHeader 
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          onRotateDock={rotateDockPosition}
        />
        <AdminSidebar 
          isSidebarCollapsed={isSidebarCollapsed}
          dockPosition={dockPosition}
        />
      </motion.aside>

      {/* Main Content */}
      <main className={cn(
        "transition-all duration-300 pt-14",
        // Desktop styles
        "lg:w-[79%] lg:mx-auto",
        // Mobile styles
        "md:w-full md:px-4",
        contentStyles[dockPosition]
      )}>
        <div className={cn(
          "container mx-auto p-6",
          // Desktop styles
          "lg:border-2 lg:border-[#34ebbd]/20 lg:rounded-xl lg:bg-black/80 lg:backdrop-blur-xl",
          // Mobile styles
          "md:border-0 md:bg-transparent"
        )}>
          {children || <Outlet />}
        </div>
      </main>

      <QuickActionFAB />
    </div>
  );
};

export default AdminLayout;