import { useEffect } from 'react';
import { cn } from "@/lib/utils";
import { useNavigationStore } from "../NavigationState";

export const NavigationContainer = ({ children }: { children: React.ReactNode }) => {
  const { isScrolled, mousePosition, setIsScrolled, setMousePosition } = useNavigationStore();

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 20;
      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled, setIsScrolled]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    if (Math.abs(x - mousePosition.x) > 1 || Math.abs(y - mousePosition.y) > 1) {
      setMousePosition({ x, y });
    }
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-[3.7rem]",
        "before:content-[''] before:absolute before:inset-0 before:bg-cyber-texture before:opacity-5",
        "after:content-[''] after:absolute before:inset-0 after:bg-scratch-overlay after:opacity-[0.02]"
      )}
      onMouseMove={handleMouseMove}
      style={{
        background: `
          linear-gradient(135deg, rgba(77, 0, 179, 0.1), rgba(114, 34, 140, 0.1), rgba(176, 230, 83, 0.1)),
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(65, 240, 219, 0.15), 
            rgba(255, 10, 190, 0.15), 
            rgba(128, 0, 255, 0.15)
          )
        `,
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(128, 0, 255, 0.3)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          {children}
        </div>
      </div>
    </nav>
  );
};