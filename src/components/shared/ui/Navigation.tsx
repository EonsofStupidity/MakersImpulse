import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const location = useLocation();

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

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-lg shadow-[#8000ff]/10" : ""
      }`}
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(65, 240, 219, 0.15), rgba(128, 0, 255, 0.15))`,
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(128, 0, 255, 0.3)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-[#41f0db] animate-neon-pulse">Makers</span>
              <span className="text-[#ff0abe] animate-neon-glow">Impulse</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/blog/latest-updates"
              className="text-white hover:text-[#41f0db] transition-all duration-300 relative group"
            >
              <span className="relative z-10">Blog</span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#41f0db]/20 to-[#8000ff]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10" />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#41f0db] to-[#8000ff] transition-all duration-300 group-hover:w-full" />
            </Link>
            <MegaMenu />
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative group hover:bg-transparent"
            >
              <Search className="h-5 w-5 text-white transition-colors duration-300 group-hover:text-[#41f0db]" />
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#41f0db]/20 to-[#8000ff]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative group hover:bg-transparent">
                  <Avatar className="h-8 w-8 border-2 border-white/20 transition-all duration-300 group-hover:border-[#ff0abe]/50">
                    <AvatarFallback className="bg-transparent text-white group-hover:text-[#41f0db] transition-colors duration-300">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#41f0db]/20 to-[#8000ff]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-black/95 backdrop-blur-xl border-white/10">
                <DropdownMenuItem asChild>
                  <Link to="/login" className="w-full hover:text-[#41f0db] transition-colors duration-300">Sign In</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/register" className="w-full hover:text-[#41f0db] transition-colors duration-300">Sign Up</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin" className="w-full hover:text-[#41f0db] transition-colors duration-300">Admin Dashboard</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};