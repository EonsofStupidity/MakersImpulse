import { LucideIcon } from "lucide-react";

interface SettingsCardHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const SettingsCardHeader = ({ icon: Icon, title, description }: SettingsCardHeaderProps) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};