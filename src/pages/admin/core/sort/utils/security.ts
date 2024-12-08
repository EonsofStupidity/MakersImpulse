import { supabase } from "@/integrations/supabase/client";

export async function logSecurityEvent(
  actionType: string,
  metadata: Record<string, any> = {}
) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return;

  await supabase.from('security_audit_logs').insert({
    user_id: session.user.id,
    action_type: actionType,
    ip_address: window.location.hostname,
    user_agent: navigator.userAgent,
    metadata
  });
}

let sessionTimeout: NodeJS.Timeout;
let idleTimeout: NodeJS.Timeout;

export function setupSessionTimeouts(
  sessionDuration: number = 24 * 60 * 60 * 1000, // 24 hours
  idleDuration: number = 30 * 60 * 1000 // 30 minutes
) {
  // Clear any existing timeouts
  clearTimeout(sessionTimeout);
  clearTimeout(idleTimeout);

  // Set up session expiration
  sessionTimeout = setTimeout(async () => {
    await supabase.auth.signOut();
    window.location.href = '/auth';
  }, sessionDuration);

  // Set up idle detection
  const resetIdleTimeout = () => {
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(async () => {
      await supabase.auth.signOut();
      window.location.href = '/auth';
    }, idleDuration);
  };

  // Reset idle timeout on user activity
  ['mousedown', 'keydown', 'touchstart', 'scroll'].forEach(event => {
    document.addEventListener(event, resetIdleTimeout);
  });

  // Initial idle timeout
  resetIdleTimeout();
}

export async function trustCurrentDevice() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return;

  const deviceHash = await generateDeviceHash();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30); // 30 days from now
  
  await supabase.from('trusted_devices').insert({
    user_id: session.user.id,
    device_hash: deviceHash,
    device_name: navigator.userAgent,
    expires_at: expiresAt.toISOString()
  });
}

async function generateDeviceHash(): Promise<string> {
  const userAgent = window.navigator.userAgent;
  const encoder = new TextEncoder();
  const data = encoder.encode(userAgent);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}