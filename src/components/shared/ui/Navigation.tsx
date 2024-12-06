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
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-[#8000ff]/30 py-4 ${
        isScrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-[#41f0db]">Makers</span>
              <span className="text-[#ff0abe]">Impulse</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/blog/latest-updates"
              className="text-white hover:text-[#41f0db] transition-colors duration-300"
            >
              Blog
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
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative group hover:bg-transparent">
                  <Avatar className="h-8 w-8 border-2 border-white/20 transition-all duration-300 group-hover:border-[#ff0abe]/50">
                    <AvatarFallback className="bg-transparent text-white group-hover:text-[#41f0db] transition-colors duration-300">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-black/95 backdrop-blur-xl border-white/10">
                <DropdownMenuItem asChild>
                  <Link to="/login" className="w-full">Sign In</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/register" className="w-full">Sign Up</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin" className="w-full">Admin Dashboard</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};