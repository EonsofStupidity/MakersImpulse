import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MegaMenu } from "./navigation/MegaMenu";
import { MobileNav } from "./navigation/mobile/MobileNav";
import { toast } from "sonner";
import { useAuthStore } from '@/lib/store/auth-store';
import { NavigationLinks } from "./navigation/NavigationLinks";
import { UserMenu } from "./navigation/UserMenu";
import { useNavigationStore } from "./navigation/NavigationState";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { session, isLoading } = useAuthStore();
  const { isScrolled, mousePosition, setIsScrolled, setMousePosition } = useNavigationStore();
  const [hasLogged, setHasLogged] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    if (!hasLogged) {
      console.log("Navigation render - Session state:", {
        userId: session?.user?.id,
        isLoading
      });
      console.log("Current location:", location.pathname);
      setHasLogged(true);
    }
  }, [session, location.pathname, hasLogged, isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 20;
      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled, setIsScrolled]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    if (Math.abs(x - mousePosition.x) > 1 || Math.abs(y - mousePosition.y) > 1) {
      setMousePosition({ x, y });
    }
  };

  const handleNavigation = (path: string) => {
    console.log('Navigating to:', path);
    navigate(path);
    toast.success(`Navigating to ${path}`);
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-[3.7rem]",
        "before:content-[''] before:absolute before:inset-0 before:bg-cyber-texture before:opacity-5",
        "after:content-[''] after:absolute before:inset-0 after:bg-scratch-overlay after:opacity-[0.02]",
        isScrolled ? "shadow-lg shadow-[#8000ff]/10" : ""
      )}
      onMouseMove={handleMouseMove}
      style={{
        background: `
          linear-gradient(135deg, rgba(77, 0, 179, 0.1), rgba(114, 34, 140, 0.1), rgba(176, 230, 83, 0.1)),
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(65, 240, 219, 0.15), 
            rgba(255, 10, 190, 0.15), 
            rgba(128, 0, 255, 0.15)
          )
        `,
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(128, 0, 255, 0.3)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <Link 
            to="/"
            className="flex items-center space-x-2 cursor-pointer group -ml-6 scale-125"
            onClick={() => handleNavigation('/')}
          >
            <span className="text-3xl font-bold flex items-center space-x-1 relative">
              <span className="neon-text-cyan relative transform -translate-y-1">
                Makers
                <span className="absolute inset-0 blur-lg bg-[#41f0db] opacity-50"></span>
                <span className="absolute inset-0 animate-pulse blur-xl bg-[#41f0db] opacity-30"></span>
              </span>
              <span className="neon-text-pink relative transform translate-y-1">
                Impulse
                <span className="absolute inset-0 blur-lg bg-[#ff0abe] opacity-50"></span>
                <span className="absolute inset-0 animate-pulse blur-xl bg-[#ff0abe] opacity-30"></span>
              </span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <NavigationLinks />
            <MegaMenu />
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative group hover:bg-transparent"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5 text-white transition-colors duration-300 group-hover:text-[#41f0db]" />
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#41f0db]/10 to-[#8000ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10 rounded-full" />
            </Button>
      
            {session?.user && (
              <div className="hidden md:block relative z-[60]">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="relative group transition-transform duration-300 hover:scale-110"
                >
                  <Avatar className="h-10 w-10 border-2 border-[#4d00b3] rounded-full transition-all duration-300 shadow-xl
                    before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-black/20 before:backdrop-blur-md
                    before:border before:border-[#4d00b3]/30 before:shadow-inner group-hover:border-[#41f0db]"
                  >
                    <AvatarImage 
                      src={session.user.user_metadata?.avatar_url || "/admin/placeholder-avatar.png"}
                      alt="User avatar"
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {session.user.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div 
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, #4d00b3, #72228c, #b0e653)`,
                      filter: 'blur(8px)',
                      zIndex: -1
                    }}
                  />
                </button>
                {showUserMenu && <UserMenu onClose={() => setShowUserMenu(false)} />}
              </div>
            )}
      
            <MobileNav />
          </div>
        </div>
      </div>

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="bg-black/80 backdrop-blur-xl border border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Search</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Search builds, parts, or guides..."
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#41f0db]"
            />
            <div className="text-sm text-white/60">
              Press <kbd className="px-2 py-1 bg-white/10 rounded">ESC</kbd> to close
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
};