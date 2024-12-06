import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, User, Home, Globe } from "lucide-react";
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
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinkClass = `
    nav-link-neon relative px-3 py-2 text-white/90 transition-all duration-300 rounded-lg
    before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#41f0db]/20 before:via-[#8B5CF6]/20 before:to-[#ff0abe]/20 
    before:opacity-0 before:transition-opacity hover:before:opacity-100 before:backdrop-blur-xl before:rounded-lg
    hover:text-white hover:shadow-[0_0_15px_rgba(65,240,219,0.3)]
    after:absolute after:inset-0 after:rounded-lg
    after:transition-all after:duration-500
    group overflow-hidden
    [&:hover]:before:animate-gradient-flow
    backdrop-blur-md
    shadow-[inset_0_0.5px_1px_rgba(255,255,255,0.3)]
  `;

  return (
    <nav className={`glass-nav nav-glitch py-4 ${isScrolled ? "shadow-lg" : ""}`}>
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-between">
          <Link to="/" className="relative group">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#41f0db] via-[#ff0abe] to-[#8000ff] bg-clip-text text-transparent">
              MakersImpulse
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            <Link to="/blog/latest-updates" className={navLinkClass}>
              <Home className="inline-block mr-2 h-4 w-4" />
              Blog
            </Link>

            {["Builds", "Parts", "Forums", "Guides", "Reviews", "Site"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className={navLinkClass}
              >
                <span className="relative z-10">
                  {item === 'Site' ? <Globe className="inline-block mr-2 h-4 w-4" /> : null}
                  {item}
                </span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(true)}
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