import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export class SecurityManager {
  private static instance: SecurityManager;
  private csrfToken: string | null = null;

  private constructor() {
    this.setupSecurityHeaders();
  }

  public static getInstance(): SecurityManager {
    if (!SecurityManager.instance) {
      SecurityManager.instance = new SecurityManager();
    }
    return SecurityManager.instance;
  }

  private setupSecurityHeaders(): void {
    if (typeof window !== 'undefined') {
      // Add security headers
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Security-Policy';
      meta.content = "default-src 'self' https://*.supabase.co; img-src 'self' data: https:; style-src 'self' 'unsafe-inline';";
      document.head.appendChild(meta);
    }
  }

  public async generateCsrfToken(): Promise<string> {
    const token = crypto.randomUUID();
    this.csrfToken = token;
    sessionStorage.setItem('csrf_token', token);
    return token;
  }

  public validateCsrfToken(token: string): boolean {
    return token === this.csrfToken && token === sessionStorage.getItem('csrf_token');
  }

  public async validateRequest(csrfToken: string): Promise<boolean> {
    if (!this.validateCsrfToken(csrfToken)) {
      throw new Error('Invalid CSRF token');
    }
    return true;
  }

  public async logSecurityEvent(
    userId: string,
    eventType: string,
    severity: 'low' | 'medium' | 'high',
    details: Record<string, any> = {}
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('security_events')
        .insert({
          user_id: userId,
          event_type: eventType,
          severity,
          details,
          ip_address: null // In a real app, you'd get this from the request
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error logging security event:', error);
      toast.error('Failed to log security event');
    }
  }

  public clearSecurityData(): void {
    this.csrfToken = null;
    sessionStorage.removeItem('csrf_token');
  }
}

export const securityManager = SecurityManager.getInstance();