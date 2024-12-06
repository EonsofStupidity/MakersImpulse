import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Hammer, 
  Wrench, 
  BookOpen, 
  Globe,
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
    <NavigationMenu>
      <NavigationMenuList className="flex items-center gap-1">
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className="h-9 px-4 py-2 group/nav-trigger bg-transparent data-[state=open]:bg-white/5 hover:bg-white/5 hover:text-[#41f0db] transition-all duration-300"
          >
            <Hammer className="w-4 h-4 mr-2" />
            Builds
            <ChevronDown className="w-3 h-3 ml-1 transition-transform duration-300 group-data-[state=open]/nav-trigger:rotate-180" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <BuildsMenu />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className="h-9 px-4 py-2 group/nav-trigger bg-transparent data-[state=open]:bg-white/5 hover:bg-white/5 hover:text-[#41f0db] transition-all duration-300"
          >
            <Wrench className="w-4 h-4 mr-2" />
            Parts
            <ChevronDown className="w-3 h-3 ml-1 transition-transform duration-300 group-data-[state=open]/nav-trigger:rotate-180" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <PartsMenu />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className="h-9 px-4 py-2 group/nav-trigger bg-transparent data-[state=open]:bg-white/5 hover:bg-white/5 hover:text-[#41f0db] transition-all duration-300"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Guides
            <ChevronDown className="w-3 h-3 ml-1 transition-transform duration-300 group-data-[state=open]/nav-trigger:rotate-180" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <GuidesMenu />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className="h-9 px-4 py-2 group/nav-trigger bg-transparent data-[state=open]:bg-white/5 hover:bg-white/5 hover:text-[#41f0db] transition-all duration-300"
          >
            <Globe className="w-4 h-4 mr-2" />
            Site
            <ChevronDown className="w-3 h-3 ml-1 transition-transform duration-300 group-data-[state=open]/nav-trigger:rotate-180" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <SiteMenu />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}