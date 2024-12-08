import { FileText, Code } from "lucide-react";
import { NavItem } from "../navigation";

export const footerNavItems: NavItem[] = [
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
  {
    title: "Terms of Service",
    href: "/terms",
    icon: FileText,
  },
  {
    title: "Privacy Policy",
    href: "/privacy",
    icon: FileText,
  },
  {
    title: "API Documentation",
    href: "/site/api",
    icon: Code,
  },
];