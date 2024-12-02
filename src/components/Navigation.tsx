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
      
      // Show/hide based on scroll direction
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled 
          ? "bg-[#1A1F2C]/80 backdrop-blur-lg border-b border-white/10 py-4" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-bold text-white hover:text-primary transition-colors duration-200"
        >
          MakersImpulse
        </Link>

        <div className="hidden md:flex items-center space-x-12">
          <Link 
            to="/builds" 
            className="relative text-white/90 hover:text-white transition-colors duration-200 group"
          >
            <span>Builds</span>
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
          </Link>
          <Link 
            to="/parts" 
            className="relative text-white/90 hover:text-white transition-colors duration-200 group"
          >
            <span>Parts</span>
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
          </Link>
          <Link 
            to="/guides" 
            className="relative text-white/90 hover:text-white transition-colors duration-200 group"
          >
            <span>Guides</span>
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
          </Link>
          <Link 
            to="/reviews" 
            className="relative text-white/90 hover:text-white transition-colors duration-200 group"
          >
            <span>Reviews</span>
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/10 transition-colors duration-200"
            onClick={() => setOpen(true)}
          >
            <Search className="h-5 w-5 text-white" />
            <span className="sr-only">Search</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-white/10 transition-colors duration-200"
              >
                <Avatar className="h-8 w-8 border-2 border-white/20">
                  <AvatarFallback className="bg-white/10 text-white">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/login" className="w-full">Sign In</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/register" className="w-full">Sign Up</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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