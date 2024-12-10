import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Users, Settings, FileText, Database, 
  BarChart3, Image, GitBranch, Activity 
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAdminSidebar } from "@/components/admin/dashboard/sidebar/AdminSidebarContext";

const adminCards = [
  {
    title: "Content Management",
    icon: FileText,
    path: "/admin/content-management",
    description: "Manage content settings and configurations",
    gradient: "from-cyan-500/20 via-cyan-400/20 to-emerald-500/20"
  },
  {
    title: "User Management",
    icon: Users,
    path: "/admin/users",
    description: "Manage users settings and configurations",
    gradient: "from-pink-500/20 via-purple-500/20 to-violet-500/20"
  },
  {
    title: "Analytics",
    icon: BarChart3,
    path: "/admin/analytics",
    description: "View platform analytics and insights",
    gradient: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20"
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/admin/settings",
    description: "Configure platform settings",
    gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20"
  },
  {
    title: "Media Library",
    icon: Image,
    path: "/admin/content-management/media",
    description: "Manage media assets",
    gradient: "from-fuchsia-500/20 via-rose-500/20 to-pink-500/20"
  },
  {
    title: "Data Maestro",
    icon: Database,
    path: "/admin/data-maestro",
    description: "Database and data management",
    gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20"
  },
  {
    title: "Workflows",
    icon: GitBranch,
    path: "/admin/content-management/workflows",
    description: "Manage content workflows",
    gradient: "from-amber-500/20 via-orange-500/20 to-red-500/20"
  },
  {
    title: "Activity Logs",
    icon: Activity,
    path: "/admin/settings/activity-logs",
    description: "View system activity logs",
    gradient: "from-purple-500/20 via-violet-500/20 to-indigo-500/20"
  }
];

const Dashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 50 });
  const { addShortcut } = useAdminSidebar();

  useEffect(() => {
    setIsLoaded(true);
    toast.success("Welcome to Admin Dashboard", {
      description: "Manage your platform's content, users, and settings"
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.div 
      className={cn(
        "min-h-screen bg-black/95 relative overflow-hidden pt-20",
        "after:absolute after:inset-0",
        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(65,240,219,0.1),rgba(255,10,190,0.1),rgba(128,0,255,0.1))]"
      )}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Dynamic gradient background */}
      <motion.div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${springX}% ${springY}%, 
            rgba(65,240,219,0.15), 
            rgba(255,10,190,0.15), 
            rgba(128,0,255,0.15)
          )`,
          filter: 'blur(40px)',
        }}
      />
      
      {/* Main content area */}
      <motion.div 
        className="relative z-10 p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-between items-center"
          >
            <div>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-purple animate-gradient-flow">
                Admin Dashboard
              </h1>
              <p className="text-white/60 mt-2">
                Manage your platform's content, users, and settings
              </p>
            </div>
          </motion.div>

          {/* Admin Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={cn(
                    "group relative overflow-hidden rounded-xl",
                    "bg-black/40 backdrop-blur-sm border border-white/10",
                    "hover:border-white/20 transition-all duration-300"
                  )}
                >
                  <Link to={card.path} className="block p-6" onClick={() => {
                    addShortcut(card.title.toLowerCase());
                    toast.success(`Added ${card.title} to shortcuts`);
                  }}>
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={cn(
                          "p-3 rounded-lg bg-white/5",
                          "group-hover:bg-white/10 transition-colors duration-300"
                        )}>
                          <Icon className="w-6 h-6 text-neon-cyan group-hover:text-neon-pink transition-colors duration-300" />
                        </div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-neon-pink transition-colors duration-300">
                          {card.title}
                        </h3>
                      </div>
                      <p className="text-white/60 group-hover:text-white/80 transition-colors duration-300">
                        {card.description}
                      </p>
                    </div>
                    <div className={cn(
                      "absolute inset-0 opacity-0 group-hover:opacity-100",
                      "transition-opacity duration-300 bg-gradient-to-r",
                      card.gradient
                    )} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;