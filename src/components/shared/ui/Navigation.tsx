import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MegaMenu } from "./navigation/MegaMenu";
import { MobileNav } from "./navigation/mobile/MobileNav";
import { toast } from "sonner";
import { useSession } from "@/components/auth/SessionContext";
import { NavigationLinks } from "./navigation/NavigationLinks";
import { UserMenu } from "./navigation/UserMenu";
import { useNavigationStore } from "./navigation/NavigationState";

export const Navigation = () => {
  const location = useLocation();
  const { session } = useSession();
  const { isScrolled, mousePosition, setIsScrolled, setMousePosition } = useNavigationStore();

  console.log("Navigation render - Current session:", session?.user);
  console.log("Current location:", location.pathname);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setIsScrolled]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-lg shadow-[#8000ff]/10" : ""
      }`}
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(65, 240, 219, 0.08), rgba(128, 0, 255, 0.08))`,
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(128, 0, 255, 0.3)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link 
            to="/"
            className="flex items-center cursor-pointer"
          >
            <span className="text-2xl font-bold">
              <span className="text-[#41f0db] animate-neon-pulse">Makers</span>
              <span className="text-[#ff0abe] animate-neon-glow">Impulse</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <NavigationLinks session={session} />
            <Link 
              to="/blog"
              className="text-white hover:text-[#41f0db] transition-all duration-300 relative group cursor-pointer"
            >
              <span className="relative z-10 text-white font-medium">Blog</span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#41f0db]/10 to-[#8000ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10" />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#41f0db] to-[#8000ff] transition-all duration-300 group-hover:w-full" />
            </Link>
            <MegaMenu />
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative group hover:bg-transparent"
              onClick={() => toast.info('Search feature coming soon!')}
            >
              <Search className="h-5 w-5 text-white transition-colors duration-300 group-hover:text-[#41f0db]" />
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#41f0db]/10 to-[#8000ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10" />
            </Button>

            <div className="hidden md:block">
              <UserMenu session={session} />
            </div>

            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
};