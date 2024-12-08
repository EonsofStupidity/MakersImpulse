import { 
  Home, 
  FileText,
  MessageSquare,
  Grid,
  Settings,
  User,
  Shield,
  Code,
  HelpCircle,
  Mail,
  Info
} from "lucide-react";
import { NavItem } from "../navigation";

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
        href: "/builds/my-builds",
        requiresAuth: true
      }
    ]
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
    requiresAuth: true,
    children: [
      {
        title: "Settings",
        href: "/settings",
        icon: Settings
      },
      {
        title: "API Access",
        href: "/profile/api",
        icon: Code
      }
    ]
  },
  {
    title: "Admin",
    href: "/admin",
    icon: Shield,
    requiresAuth: true
  },
  {
    title: "About",
    href: "/about",
    icon: Info,
    children: [
      {
        title: "About Us",
        href: "/about"
      },
      {
        title: "FAQ",
        href: "/faq",
        icon: HelpCircle
      },
      {
        title: "Contact",
        href: "/contact",
        icon: Mail
      }
    ]
  }
];