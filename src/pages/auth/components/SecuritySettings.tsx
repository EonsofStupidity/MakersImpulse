import { SecurityAuditLog } from "./security/SecurityAuditLog";
import { RecoveryCodes } from "./security/RecoveryCodes";
import { TrustedDevices } from "./security/TrustedDevices";
import { ActiveSessions } from "./security/ActiveSessions";

export const SecuritySettings = () => {
  return (
    <div className="space-y-6">
      <RecoveryCodes />
      <TrustedDevices />
      <ActiveSessions />
      <SecurityAuditLog />
    </div>
  );
};
