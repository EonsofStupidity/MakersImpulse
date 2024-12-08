import { Switch } from "@/components/ui/switch";

interface PermissionSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled: boolean;
  label: string;
}

export const PermissionSwitch = ({ checked, onCheckedChange, disabled, label }: PermissionSwitchProps) => (
  <div className="flex items-center gap-2">
    <Switch
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
    />
    <span className="text-sm">{label}</span>
  </div>
);