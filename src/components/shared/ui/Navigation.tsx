import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MegaMenu } from "./navigation/MegaMenu";
import { MobileNav } from "./navigation/mobile/MobileNav";
import { toast } from "sonner";
import { useSession } from "@/components/auth/SessionContext";
import { supabase } from "@/integrations/supabase/client";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const location = useLocation();
  const navigate = useNavigate();
  const { session } = useSession();

  console.log("Navigation render - Current session:", session);
  console.log("Current location:", location.pathname);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleNavigation = async (to: string) => {
    console.log('Navigating to:', to);
    
    if (to === '/admin' && (!session || !session.user)) {
      console.log('Attempting to access admin without auth');
      toast.error("Please login to access the admin dashboard");
      navigate('/login');
      return;
    }

    navigate(to);
    toast.success(`Navigating to ${to.replace('/', '').toUpperCase()}`);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Successfully logged out");
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error("Error logging out");
    }
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
            onClick={() => handleNavigation('/')}
          >
            <span className="text-2xl font-bold">
              <span className="text-[#41f0db] animate-neon-pulse">Makers</span>
              <span className="text-[#ff0abe] animate-neon-glow">Impulse</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/blog"
              className="text-white hover:text-[#41f0db] transition-all duration-300 relative group cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/blog');
              }}
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative group hover:bg-transparent">
                    <Avatar className="h-8 w-8 border-2 border-white/20 transition-all duration-300 group-hover:border-[#ff0abe]/50">
                      <AvatarFallback className="bg-transparent text-white group-hover:text-[#41f0db] transition-colors duration-300">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#41f0db]/10 to-[#8000ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-black/95 backdrop-blur-xl border-white/10">
                  {!session ? (
                    <>
                      <DropdownMenuItem 
                        onClick={() => handleNavigation('/login')}
                        className="cursor-pointer w-full text-white hover:text-[#41f0db] transition-colors duration-300 font-medium"
                      >
                        Sign In
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleNavigation('/register')}
                        className="cursor-pointer w-full text-white hover:text-[#41f0db] transition-colors duration-300 font-medium"
                      >
                        Sign Up
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      {session.user.role === 'admin' && (
                        <DropdownMenuItem 
                          onClick={() => handleNavigation('/admin')}
                          className="cursor-pointer w-full text-white hover:text-[#41f0db] transition-colors duration-300 font-medium"
                        >
                          Admin Dashboard
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        onClick={handleLogout}
                        className="cursor-pointer w-full text-white hover:text-[#41f0db] transition-colors duration-300 font-medium"
                      >
                        Sign Out
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
};