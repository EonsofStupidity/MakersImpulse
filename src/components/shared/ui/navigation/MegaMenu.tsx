import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { 
  Hammer, 
  Wrench, 
  BookOpen, 
  Globe, 
  Home,
  ChevronDown 
} from 'lucide-react';

const menuVariants = {
  hidden: { 
    opacity: 0,
    y: -5,
    scale: 0.95
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -5,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: "easeIn"
    }
  }
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            "hover:bg-white/5 hover:text-neon-cyan focus:bg-white/5 focus:text-neon-cyan",
            "group/nav-item relative",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none group-hover/nav-item:text-neon-cyan">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-white/70 group-hover/nav-item:text-white/90">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export function MegaMenu() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="flex items-center gap-1">
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className="h-9 px-4 py-2 group/nav-trigger data-[state=open]:bg-white/5"
          >
            <Hammer className="w-4 h-4 mr-2" />
            Builds
            <ChevronDown className="w-3 h-3 ml-1 transition-transform group-data-[state=open]/nav-trigger:rotate-180" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <motion.ul
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid w-[400px] gap-3 p-4 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl"
            >
              <ListItem href="/maker-space/builds" title="Featured Builds">
                Explore our curated collection of outstanding 3D printer builds
              </ListItem>
              <ListItem href="/maker-space/builds/latest" title="Latest Builds">
                Check out the newest community builds and modifications
              </ListItem>
              <ListItem href="/maker-space/builds/categories" title="Build Categories">
                Browse builds by printer type, modification type, or purpose
              </ListItem>
            </motion.ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-9 px-4 py-2 group/nav-trigger data-[state=open]:bg-white/5">
            <Wrench className="w-4 h-4 mr-2" />
            Parts
            <ChevronDown className="w-3 h-3 ml-1 transition-transform group-data-[state=open]/nav-trigger:rotate-180" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <motion.ul
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid w-[400px] gap-3 p-4 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl"
            >
              <ListItem href="/maker-space/parts" title="Browse Parts">
                Find the perfect parts for your 3D printer build or upgrade
              </ListItem>
              <ListItem href="/maker-space/parts/manufacturers" title="Manufacturers">
                Explore parts by manufacturer and brand
              </ListItem>
              <ListItem href="/maker-space/parts/compatibility" title="Compatibility Guide">
                Check part compatibility with your printer model
              </ListItem>
            </motion.ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-9 px-4 py-2 group/nav-trigger data-[state=open]:bg-white/5">
            <BookOpen className="w-4 h-4 mr-2" />
            Guides
            <ChevronDown className="w-3 h-3 ml-1 transition-transform group-data-[state=open]/nav-trigger:rotate-180" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <motion.ul
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid w-[400px] gap-3 p-4 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl"
            >
              <ListItem href="/maker-space/guides/getting-started" title="Getting Started">
                Essential guides for beginners in 3D printing
              </ListItem>
              <ListItem href="/maker-space/guides/advanced" title="Advanced Tutorials">
                Deep dive into advanced techniques and modifications
              </ListItem>
              <ListItem href="/maker-space/guides/troubleshooting" title="Troubleshooting">
                Solutions to common problems and maintenance guides
              </ListItem>
            </motion.ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-9 px-4 py-2 group/nav-trigger data-[state=open]:bg-white/5">
            <Globe className="w-4 h-4 mr-2" />
            Site
            <ChevronDown className="w-3 h-3 ml-1 transition-transform group-data-[state=open]/nav-trigger:rotate-180" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <motion.ul
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid w-[400px] gap-3 p-4 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl"
            >
              <ListItem href="/maker-space" title="Maker Space">
                Your central hub for all maker resources
              </ListItem>
              <ListItem href="/about" title="About">
                Learn about our mission and community
              </ListItem>
              <ListItem href="/terms" title="Terms">
                Terms of service and usage guidelines
              </ListItem>
              <ListItem href="/privacy" title="Privacy">
                Our privacy policy and data practices
              </ListItem>
            </motion.ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link 
            to="/blog/latest-updates"
            className="group/nav-link inline-flex h-9 px-4 py-2 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-white/5 hover:text-neon-cyan focus:bg-white/5 focus:text-neon-cyan"
          >
            <Home className="w-4 h-4 mr-2" />
            Blog
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}