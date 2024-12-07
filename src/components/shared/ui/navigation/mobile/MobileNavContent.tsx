import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const menuVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const menuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

interface MobileNavContentProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavContent = ({ isOpen, onClose }: MobileNavContentProps) => {
  const menuItems = [
    { to: "/", label: "Home" },
    { to: "/blog", label: "Blog" },
    { to: "/maker-space", label: "Maker Space" },
    { to: "/login", label: "Sign In" },
    { to: "/register", label: "Sign Up" },
  ];

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={{
        open: { 
          x: 0,
          transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        closed: { 
          x: "100%",
          transition: { type: "spring", stiffness: 300, damping: 30 }
        }
      }}
      className="fixed inset-y-0 right-0 w-full max-w-sm bg-black/95 backdrop-blur-xl shadow-lg z-50 md:hidden"
    >
      <motion.nav
        variants={menuVariants}
        className="flex flex-col gap-2 p-6 pt-24"
      >
        {menuItems.map((item) => (
          <motion.div key={item.to} variants={menuItemVariants}>
            <Link
              to={item.to}
              onClick={onClose}
              className="block w-full px-4 py-3 text-lg font-medium text-white rounded-lg transition-colors duration-200 hover:bg-white/10 hover:text-[#41f0db] relative group"
            >
              {item.label}
              <motion.div
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#41f0db]/10 to-[#8000ff]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                layoutId={`highlight-${item.to}`}
              />
            </Link>
          </motion.div>
        ))}
      </motion.nav>
    </motion.div>
  );
};