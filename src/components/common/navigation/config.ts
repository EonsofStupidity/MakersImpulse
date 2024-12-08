import { Home, FileText, MessageSquare, Grid, Settings, User, Shield } from "lucide-react";
import { NavItem } from "./types";

export const mainNavItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: Home
  },
  {
    title: "Blog",
    href: "/blog",
    icon: FileText,
    children: [
      {
        title: "Latest Posts",
        href: "/blog/latest"
      },
      {
        title: "Categories",
        href: "/blog/categories"
      }
    ]
  },
  {
    title: "Forum",
    href: "/forum",
    icon: MessageSquare,
    children: [
      {
        title: "Discussions",
        href: "/forum/discussions"
      },
      {
        title: "Categories",
        href: "/forum/categories"
      }
    ]
  },
  {
    title: "Builds",
    href: "/builds",
    icon: Grid,
    children: [
      {
        title: "Featured Builds",
        href: "/builds/featured"
      },
      {
        title: "Recent Builds",
        href: "/builds/recent"
      },
      {
        title: "My Builds",
        href: "/builds/my-builds"
      }
    ]
  }
];

export const userNavItems: NavItem[] = [
  {
    title: "Profile",
    href: "/profile",
    icon: User
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings
  },
  {
    title: "Admin Dashboard",
    href: "/admin",
    icon: Shield,
    requiresAuth: true
  }
];