import { mainNavItems } from "./config";
import { NavLink } from "./NavLink";

export function MainNav() {
  return (
    <nav className="flex items-center space-x-1">
      {mainNavItems.map((item) => (
        <NavLink key={item.href} {...item} />
      ))}
    </nav>
  );
}