import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, User } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setIsScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled 
          ? "bg-[#1A1F2C]/40 backdrop-blur-xl border-b border-white/10 py-4 shadow-lg" 
          : "bg-transparent py-6"
      }`}
      style={{
        backdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "none",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="relative group"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-[#41f0db] via-[#ff0abe] to-[#8000ff] bg-clip-text text-transparent transition-all duration-300 group-hover:opacity-80">
              MakersImpulse
            </span>
            <div className="absolute -inset-x-4 -inset-y-2 group-hover:bg-white/5 rounded-lg transition-all duration-300" />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-12">
            {["Builds", "Parts", "Guides", "Reviews"].map((item) => (
              <Link 
                key={item}
                to={`/${item.toLowerCase()}`} 
                className="relative group py-2"
              >
                <span className="text-white/90 transition-colors duration-300 group-hover:text-[#ff0abe]">
                  {item}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ff0abe] transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
                <div className="absolute -inset-x-3 -inset-y-2 group-hover:bg-white/5 rounded-lg transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="icon"
              className="relative group"
              onClick={() => setOpen(true)}
            >
              <Search className="h-5 w-5 text-white transition-colors duration-300 group-hover:text-[#ff0abe]" />
              <div className="absolute -inset-2 group-hover:bg-white/5 rounded-lg transition-all duration-300" />
              <span className="sr-only">Search</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative group"
                >
                  <Avatar className="h-8 w-8 border-2 border-white/20 transition-all duration-300 group-hover:border-[#ff0abe]/50">
                    <AvatarFallback className="bg-white/10 text-white">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -inset-2 group-hover:bg-white/5 rounded-lg transition-all duration-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 bg-[#1A1F2C]/95 backdrop-blur-xl border-white/10"
              >
                <DropdownMenuItem asChild>
                  <Link to="/login" className="w-full group">
                    <span className="text-white/90 transition-colors duration-300 group-hover:text-[#ff0abe]">
                      Sign In
                    </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/register" className="w-full group">
                    <span className="text-white/90 transition-colors duration-300 group-hover:text-[#ff0abe]">
                      Sign Up
                    </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin" className="w-full group">
                    <span className="text-white/90 transition-colors duration-300 group-hover:text-[#ff0abe]">
                      Admin Dashboard
                    </span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search MakersImpulse..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Popular Builds</CommandItem>
            <CommandItem>Latest Parts</CommandItem>
            <CommandItem>Featured Guides</CommandItem>
            <CommandItem>Top Reviews</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </nav>
  );
};