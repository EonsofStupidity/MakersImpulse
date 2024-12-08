import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NavItem } from "./types";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface NavLinkProps extends NavItem {
  className?: string;
}

export function NavLink({ title, href, icon: Icon, disabled, external, className, children }: NavLinkProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (children) {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (external) {
      window.open(href, "_blank");
    } else {
      navigate(href);
    }
  };

  const letters = title.split('');

  return (
    <div className="relative">
      <button
        className={cn(
          "nav-link group inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
          "text-gray-300 hover:text-[#fa19a7]",
          "relative overflow-hidden",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        onClick={handleClick}
        disabled={disabled}
        style={{
          background: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        }}
      >
        {Icon && <Icon className="h-4 w-4" />}
        <div className="flex">
          {letters.map((letter, index) => (
            <span
              key={index}
              className="inline-block transition-all duration-300 hover:text-[#fa19a7]"
              style={{ 
                transitionDelay: `${index * 50}ms`,
                transform: "translateZ(10px)"
              }}
            >
              {letter}
            </span>
          ))}
        </div>
        {children && (
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        )}
      </button>

      <AnimatePresence>
        {isOpen && children && children.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full z-50 mt-2 min-w-[200px] rounded-md border border-border/40 bg-black/80 p-2 backdrop-blur-xl"
            style={{
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              borderBottom: "2px solid rgba(255, 255, 255, 0.1)"
            }}
          >
            {children.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-md hover:bg-white/5"
              >
                <button
                  className="flex w-full items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-300 hover:text-[#fa19a7] transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    item.external ? window.open(item.href, "_blank") : navigate(item.href);
                  }}
                  disabled={item.disabled}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.title}
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}