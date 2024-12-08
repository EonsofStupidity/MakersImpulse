import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Database,
  Settings,
  Users,
  Shield,
  Activity,
  Workflow
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin"
  },
  {
    title: "Database",
    icon: Database,
    href: "/admin/database"
  },
  {
    title: "Users",
    icon: Users,
    href: "/admin/users"
  },
  {
    title: "Security",
    icon: Shield,
    href: "/admin/security"
  },
  {
    title: "Monitoring",
    icon: Activity,
    href: "/admin/monitoring"
  },
  {
    title: "Workflows",
    icon: Workflow,
    href: "/admin/workflows"
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/admin/settings"
  }
];

export interface AdminSidebarProps {
  isSidebarCollapsed: boolean;
  dockPosition: 'left' | 'right' | 'top' | 'bottom';
}

export const AdminSidebar = ({ isSidebarCollapsed, dockPosition }: AdminSidebarProps) => {
  const isHorizontal = dockPosition === 'top' || dockPosition === 'bottom';

  return (
    <nav className={cn(
      "h-full overflow-y-auto",
      // Desktop styles
      "lg:bg-transparent lg:backdrop-blur-xl",
      // Mobile styles
      "md:bg-gradient-to-b md:from-[#34ebbd]/10 md:via-[#fa19a7]/10 md:to-transparent md:backdrop-blur-md",
      // Layout styles
      isHorizontal ? "flex items-center" : "block"
    )}>
      <ul className={cn(
        "space-y-2 p-4",
        isHorizontal && "flex space-y-0 space-x-4"
      )}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <NavLink
                to={item.href}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300",
                  // Desktop styles
                  "lg:hover:bg-white/5 lg:text-gray-300 lg:hover:text-[#fa19a7]",
                  // Mobile styles
                  "md:hover:bg-[#34ebbd]/10 md:text-white md:hover:text-[#34ebbd]",
                  isActive && "bg-white/5 text-[#fa19a7]",
                  // Collapsed styles
                  isSidebarCollapsed && "justify-center"
                )}
              >
                <div className={cn(
                  "p-2 rounded-lg transition-colors",
                  "group-hover:bg-gradient-to-r from-[#34ebbd]/20 to-[#fa19a7]/20"
                )}>
                  <Icon className="h-5 w-5" />
                </div>
                {!isSidebarCollapsed && <span>{item.title}</span>}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};