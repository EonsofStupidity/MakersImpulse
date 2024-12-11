import { LucideIcon } from "lucide-react";

interface UserMenuItemProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'danger';
}

export const UserMenuItem = ({ icon: Icon, label, onClick, variant = 'default' }: UserMenuItemProps) => {
  const baseClasses = "flex items-center space-x-2 w-full p-2 text-sm text-left hover:bg-white/5 rounded-lg transition-all duration-300 group";
  const variantClasses = variant === 'danger' 
    ? "text-red-400 hover:text-red-300 hover:bg-red-500/10" 
    : "text-white/80 hover:text-[#41f0db]";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses}`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
};