import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { AuthenticatedMenuItems, UnauthenticatedMenuItems } from "./components/MenuItems";

export function UserNav() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account",
    });
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarFallback className="bg-black text-primary">
              {session?.user?.email?.[0].toUpperCase() || "G"}
            </AvatarFallback>
          </Avatar>
        </motion.div>
      </SheetTrigger>
      
      <SheetContent 
        side="right" 
        className="w-[79%] sm:w-[300px] p-0 bg-black/80 backdrop-blur-xl border-l border-[#34ebbd]/20"
      >
        <div className="h-full flex flex-col relative overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#34ebbd]/5 via-[#fa19a7]/5 to-transparent animate-gradient-shift pointer-events-none" />
          
          {/* Frosted glass effect container */}
          <div className="relative w-full h-full backdrop-blur-sm">
            {session ? (
              <>
                <div className="p-6 border-b border-[#34ebbd]/20 bg-gradient-to-r from-black/40 to-transparent">
                  <p className="text-lg font-medium text-[#34ebbd] truncate">
                    {session.user.email}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage your account
                  </p>
                </div>

                <motion.div 
                  className="flex-1 overflow-y-auto py-4 px-2"
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
                    <AuthenticatedMenuItems onClose={() => setIsOpen(false)} />
                  </AnimatePresence>
                </motion.div>

                <div className="p-4 border-t border-[#34ebbd]/20 bg-gradient-to-t from-black/40 to-transparent">
                  <button
                    onClick={handleSignOut}
                    className="w-full px-6 py-3 flex items-center gap-4 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="p-2 rounded-lg bg-black/20 group-hover:bg-red-500/20 transition-colors">
                      <LogOut className="h-4 w-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                    </div>
                    <span className="font-medium relative z-10">Sign Out</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col">
                <div className="p-6 border-b border-[#34ebbd]/20 bg-gradient-to-r from-black/40 to-transparent">
                  <h2 className="text-[#fa19a7] text-2xl font-bold mb-2">Welcome!</h2>
                  <p className="text-sm text-muted-foreground">
                    Sign in to access all features
                  </p>
                </div>

                <div className="flex-1 p-4 space-y-4">
                  <div className="grid gap-4">
                    <UnauthenticatedMenuItems onClose={() => setIsOpen(false)} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}