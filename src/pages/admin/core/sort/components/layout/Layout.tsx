import { Outlet } from "react-router-dom";
import Navigation from "@/components/common/navigation/Navigation";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-[#1f2937] relative overflow-hidden">
      {/* Modern abstract background patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-subtle-shift absolute inset-0" />
        <div className="bg-[linear-gradient(135deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-subtle-shift-reverse absolute inset-0" />
      </div>

      {/* Main content with increased width, gradient border and depth effect */}
      <main className="relative w-[106%] -ml-[3%]">
        <div className="container mx-auto pt-6 px-8 relative">
          {/* Gradient border and depth effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#34ebbd]/20 via-[#34ebbd]/5 to-transparent backdrop-blur-sm 
               transform -skew-y-1 scale-[1.02] -translate-y-1 shadow-[0_8px_32px_rgba(0,0,0,0.12)] pointer-events-none" />
          
          {/* Content container with glass effect */}
          <div className="relative bg-[#1a1f2c]/90 backdrop-blur-md rounded-xl p-6 
               shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_1px_2px_rgba(0,0,0,0.3)] 
               hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_1px_3px_rgba(0,0,0,0.4)] 
               transition-shadow duration-300">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;