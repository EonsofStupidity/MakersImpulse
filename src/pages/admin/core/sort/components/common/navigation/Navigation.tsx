import { useState } from "react";
import { MainNav } from "./MainNav";
import { UserNav } from "./UserNav";
import { SearchBar } from "./SearchBar";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { mainNavItems } from "./config";
import { useNavigate } from "react-router-dom";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.header
      className="w-full border-b border-border/40 backdrop-blur-xl bg-gradient-to-b from-black/80 to-black/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        borderBottom: "2px solid rgba(255, 255, 255, 0.1)"
      }}
    >
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="relative">
                <Menu className="h-6 w-6 transition-transform duration-200" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="left" 
              className="w-80 bg-black/95 backdrop-blur-xl p-0"
            >
              <div className="h-full flex flex-col">
                <div className="p-6 border-b border-border/40">
                  <Link
                    to="/"
                    className="text-[#34ebbd] text-2xl font-bold relative group"
                    style={{ 
                      textShadow: "0 2px 4px rgba(52, 235, 189, 0.3)",
                      fontFamily: "Space Grotesk, sans-serif"
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="inline-block transition-all duration-300 group-hover:text-[#fa19a7]">
                      MakersImpulse
                    </span>
                  </Link>
                </div>

                <motion.div 
                  className="flex-1 overflow-y-auto py-4"
                  initial="closed"
                  animate="open"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
                    },
                    closed: {
                      transition: { staggerChildren: 0.05, staggerDirection: -1 }
                    }
                  }}
                >
                  <AnimatePresence>
                    {mainNavItems.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                          delay: index * 0.05
                        }}
                      >
                        <button
                          onClick={() => {
                            navigate(item.href);
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full px-6 py-3 flex items-center gap-4 hover:bg-primary/5 transition-colors group relative overflow-hidden"
                        >
                          {item.icon && (
                            <div className="p-2 rounded-lg bg-black/20 group-hover:bg-primary/20 transition-colors">
                              <item.icon className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                            </div>
                          )}
                          <span className="font-medium group-hover:text-primary transition-colors">{item.title}</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            </SheetContent>
          </Sheet>

          <Link
            to="/"
            className="text-[#34ebbd] text-2xl font-bold relative group perspective-1000"
            style={{ 
              textShadow: "0 2px 4px rgba(52, 235, 189, 0.3)",
              transform: "translateZ(20px)",
              fontFamily: "Space Grotesk, sans-serif"
            }}
          >
            <span className="inline-block transition-all duration-300 group-hover:text-[#fa19a7] hover-text-effect">
              MakersImpulse
            </span>
          </Link>
          
          <div className="hidden lg:block">
            <MainNav />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <SearchBar />
          <UserNav />
        </div>
      </div>
    </motion.header>
  );
}

export default Navigation;