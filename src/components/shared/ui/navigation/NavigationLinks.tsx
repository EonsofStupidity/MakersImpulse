import { Link } from "react-router-dom";
import { Wrench, BookOpen, Box, LayoutDashboard } from "lucide-react";
import { AuthSession } from '@/integrations/supabase/types/auth';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface NavigationLinksProps {
  session: AuthSession | null;
}

export const NavigationLinks = ({ session }: NavigationLinksProps) => {
  const { data: profile } = useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id
  });

  if (!session) return null;

  const isAdmin = profile?.role === 'admin' || profile?.role === 'super_admin';

  const makerSpaceLinks = [
    { to: "/maker-space/builds", label: "Builds", icon: Wrench },
    { to: "/maker-space/guides", label: "Guides", icon: BookOpen },
    { to: "/maker-space/parts", label: "Parts", icon: Box },
  ];

  return (
    <>
      {isAdmin && (
        <Link 
          to="/admin"
          className="text-white hover:text-[#41f0db] transition-all duration-300 relative group cursor-pointer flex items-center gap-2"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span className="relative z-10 text-white font-medium">Admin Dashboard</span>
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#41f0db]/10 to-[#8000ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10" />
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#41f0db] to-[#8000ff] transition-all duration-300 group-hover:w-full" />
        </Link>
      )}
      {makerSpaceLinks.map((link) => (
        <Link 
          key={link.to}
          to={link.to}
          className="text-white hover:text-[#41f0db] transition-all duration-300 relative group cursor-pointer flex items-center gap-2"
        >
          <link.icon className="w-4 h-4" />
          <span className="relative z-10 text-white font-medium">{link.label}</span>
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#41f0db]/10 to-[#8000ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10" />
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#41f0db] to-[#8000ff] transition-all duration-300 group-hover:w-full" />
        </Link>
      ))}
    </>
  );
};