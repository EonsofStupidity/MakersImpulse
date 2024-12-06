import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Hammer, 
  Wrench, 
  BookOpen, 
  Globe,
  Home,
  ChevronDown 
} from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { BuildsMenu } from './menu-items/BuildsMenu';
import { PartsMenu } from './menu-items/PartsMenu';
import { GuidesMenu } from './menu-items/GuidesMenu';
import { SiteMenu } from './menu-items/SiteMenu';

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
            <BuildsMenu />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-9 px-4 py-2 group/nav-trigger data-[state=open]:bg-white/5">
            <Wrench className="w-4 h-4 mr-2" />
            Parts
            <ChevronDown className="w-3 h-3 ml-1 transition-transform group-data-[state=open]/nav-trigger:rotate-180" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <PartsMenu />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-9 px-4 py-2 group/nav-trigger data-[state=open]:bg-white/5">
            <BookOpen className="w-4 h-4 mr-2" />
            Guides
            <ChevronDown className="w-3 h-3 ml-1 transition-transform group-data-[state=open]/nav-trigger:rotate-180" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <GuidesMenu />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-9 px-4 py-2 group/nav-trigger data-[state=open]:bg-white/5">
            <Globe className="w-4 h-4 mr-2" />
            Site
            <ChevronDown className="w-3 h-3 ml-1 transition-transform group-data-[state=open]/nav-trigger:rotate-180" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <SiteMenu />
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