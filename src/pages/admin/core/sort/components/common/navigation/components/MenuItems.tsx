import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, FileText, MessageSquare, Grid, Settings, 
  User, Shield, Code, HelpCircle, LogOut, Bell, 
  Bookmark, Wrench, Github, Mail, Phone 
} from "lucide-react";
import { motion } from "framer-motion";
import { useSession } from "@supabase/auth-helpers-react";

interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  onClick?: () => void;
  className?: string;
  isAdmin?: boolean;
}

export const MenuItem = ({ icon: Icon, label, href, onClick, className, isAdmin }: MenuItemProps) => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className="relative"
    >
      <Button
        variant="ghost"
        className={`w-full px-6 py-3 flex items-center gap-4 hover:bg-[#34ebbd]/10 transition-all duration-300 group relative overflow-hidden ${
          isAdmin ? 'text-[#fa19a7] hover:text-[#fa19a7]' : ''
        } ${className}`}
        onClick={() => {
          navigate(href);
          onClick?.();
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#34ebbd]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className={`p-2 rounded-lg ${
          isAdmin ? 'bg-[#fa19a7]/20' : 'bg-[#34ebbd]/20'
        } group-hover:bg-[#34ebbd]/30 transition-colors`}>
          <Icon className={`h-4 w-4 ${
            isAdmin ? 'text-[#fa19a7]' : 'text-[#34ebbd]'
          } group-hover:text-[#34ebbd] transition-colors`} />
        </div>
        <span className="font-medium relative z-10">{label}</span>
      </Button>
    </motion.div>
  );
};

export const AuthenticatedMenuItems = ({ onClose }: { onClose?: () => void }) => {
  const session = useSession();
  const isAdmin = session?.user?.email === "jessay@gmail.com";

  return (
    <div className="space-y-1 px-2">
      <MenuItem icon={Home} label="Home" href="/" onClick={onClose} />
      <MenuItem icon={FileText} label="Blog" href="/blog" onClick={onClose} />
      <MenuItem icon={MessageSquare} label="Forum" href="/forum" onClick={onClose} />
      <MenuItem icon={Grid} label="Builds" href="/builds" onClick={onClose} />
      <MenuItem icon={User} label="Profile" href="/profile" onClick={onClose} />
      <MenuItem icon={Settings} label="Settings" href="/settings" onClick={onClose} />
      <MenuItem icon={Code} label="API Access" href="/settings/api" onClick={onClose} />
      {isAdmin && (
        <MenuItem 
          icon={Shield} 
          label="Admin Dashboard" 
          href="/admin" 
          onClick={onClose}
          isAdmin={true}
        />
      )}
      <MenuItem icon={Bell} label="Notifications" href="/settings/notifications" onClick={onClose} />
      <MenuItem icon={Bookmark} label="Saved Items" href="/settings/saved" onClick={onClose} />
      <MenuItem icon={Wrench} label="Build Tools" href="/settings/tools" onClick={onClose} />
      <MenuItem icon={HelpCircle} label="Help" href="/help" onClick={onClose} />
    </div>
  );
};

export const UnauthenticatedMenuItems = ({ onClose }: { onClose?: () => void }) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-4 px-2">
      <Button
        variant="outline"
        className="w-full h-12 flex items-center justify-center gap-2 bg-black/40 backdrop-blur-sm border-[#34ebbd]/20 hover:bg-black/60 hover:text-[#34ebbd] transition-all duration-300"
        onClick={() => {
          navigate("/auth");
          onClose?.();
        }}
      >
        <Github className="h-5 w-5" />
        Continue with GitHub
      </Button>

      <Button
        variant="outline"
        className="w-full h-12 flex items-center justify-center gap-2 bg-black/40 backdrop-blur-sm border-[#34ebbd]/20 hover:bg-black/60 hover:text-[#34ebbd] transition-all duration-300"
        onClick={() => {
          navigate("/auth");
          onClose?.();
        }}
      >
        <Mail className="h-5 w-5" />
        Continue with Google
      </Button>

      <Button
        variant="outline"
        className="w-full h-12 flex items-center justify-center gap-2 bg-black/40 backdrop-blur-sm border-[#34ebbd]/20 hover:bg-black/60 hover:text-[#34ebbd] transition-all duration-300"
        onClick={() => {
          navigate("/auth");
          onClose?.();
        }}
      >
        <Phone className="h-5 w-5" />
        Continue with Discord
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-[#34ebbd]/20" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-black px-2 text-muted-foreground">
            Or continue with email
          </span>
        </div>
      </div>

      <Button
        className="w-full h-12 bg-gradient-to-r from-[#34ebbd] to-[#fa19a7] hover:opacity-90 transition-opacity"
        onClick={() => {
          navigate("/auth");
          onClose?.();
        }}
      >
        <User className="h-5 w-5 mr-2" />
        Sign In / Register
      </Button>
    </div>
  );
};