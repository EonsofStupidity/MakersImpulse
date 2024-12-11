import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuthStore } from '@/lib/store/auth-store';
import { useNavigationStore } from "./navigation/NavigationState";
import { cn } from "@/lib/utils";
import { NavigationLinks } from "./navigation/NavigationLinks";
import { MegaMenu } from "./navigation/MegaMenu";
import { MobileNav } from "./navigation/mobile/MobileNav";
import { UserMenu } from "./navigation/UserMenu";
import { UserAvatar } from "./avatar/UserAvatar";
import { Logo } from "./navigation/Logo";
import { SearchButton } from "./navigation/SearchButton";
import { SearchDialog } from "./navigation/SearchDialog";

export const Navigation = () => {
  const location = useLocation();
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

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-[3.7rem]",
        "before:content-[''] before:absolute before:inset-0 before:bg-cyber-texture before:opacity-5",
        "after:content-[''] after:absolute before:inset-0 after:bg-scratch-overlay after:opacity-[0.02]"
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
          <Logo />

          <div className="hidden md:flex items-center space-x-6">
            <NavigationLinks />
            <MegaMenu />
          </div>

          <div className="flex items-center space-x-4">
            <SearchButton onClick={() => setSearchOpen(true)} />
      
            <div className="hidden md:block relative z-[60]">
              <UserAvatar
                size="lg"
                className="transform translate-y-2"
                onClick={() => setShowUserMenu(!showUserMenu)}
              />
              {showUserMenu && <UserMenu onClose={() => setShowUserMenu(false)} />}
            </div>
      
            <MobileNav />
          </div>
        </div>
      </div>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </nav>
  );
};