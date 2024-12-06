import React from 'react';
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export const ListItem = React.forwardRef<
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