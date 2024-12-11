import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from '@/lib/store/auth-store';
import { toast } from "sonner";
import { handleSecurityEvent } from "@/utils/auth/securityHandlers";

interface SessionConfig {
  timeoutMinutes: number;
  maxConcurrentSessions: number;
  refreshThresholdMinutes: number;
}

const DEFAULT_CONFIG: SessionConfig = {
  timeoutMinutes: 30,
  maxConcurrentSessions: 3,
  refreshThresholdMinutes: 5
};

export class SessionManager {
  private static instance: SessionManager;
  private refreshTimeout?: NodeJS.Timeout;
  private config: SessionConfig;
  private lastActivity: Date;
  private boundHandleActivity: () => void;
  private boundHandleStorage: (event: StorageEvent) => void;

  private constructor(config: Partial<SessionConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.lastActivity = new Date();
    this.boundHandleActivity = this.updateLastActivity.bind(this);
    this.boundHandleStorage = this.handleStorageEvent.bind(this);
    this.setupActivityListeners();
  }

  public static getInstance(config?: Partial<SessionConfig>): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager(config);
    }
    return SessionManager.instance;
  }

  private setupActivityListeners(): void {
    if (typeof window !== 'undefined') {
      ['mousedown', 'keydown', 'touchstart', 'scroll'].forEach(event => {
        window.addEventListener(event, this.boundHandleActivity);
      });

      window.addEventListener('storage', this.boundHandleStorage);
    }
  }

  private handleStorageEvent(event: StorageEvent): void {
    if (event.key === 'auth_session_state') {
      this.handleCrossTabSync(event.newValue);
    }
  }

  private updateLastActivity(): void {
    this.lastActivity = new Date();
    localStorage.setItem('last_activity', this.lastActivity.toISOString());
  }

  private async handleCrossTabSync(newState: string | null): Promise<void> {
    if (!newState) return;

    try {
      const state = JSON.parse(newState);
      if (state.event === 'SIGNED_OUT') {
        await this.handleSignOut();
      }
    } catch (error) {
      console.error('Error handling cross-tab sync:', error);
    }
  }

  public async initializeSession(): Promise<void> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;

      if (session) {
        await this.validateAndRefreshSession(session);
        this.scheduleTokenRefresh(session.expires_in);
        this.broadcastSessionState({ event: 'SIGNED_IN' });
      }
    } catch (error) {
      console.error('Session initialization error:', error);
      toast.error('Error initializing session');
      await this.handleSignOut();
    }
  }

  private async validateAndRefreshSession(session: any): Promise<void> {
    if (!session?.expires_at) return;

    const expiresAt = new Date(session.expires_at * 1000);
    const now = new Date();
    const minutesUntilExpiry = (expiresAt.getTime() - now.getTime()) / (1000 * 60);

    if (minutesUntilExpiry <= this.config.refreshThresholdMinutes) {
      await this.refreshToken();
    }
  }

  private async refreshToken(): Promise<void> {
    try {
      const { data: { session }, error } = await supabase.auth.refreshSession();
      if (error) throw error;

      if (session) {
        this.scheduleTokenRefresh(session.expires_in);
        await handleSecurityEvent(session.user.id, 'token_refresh', 'low');
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      toast.error('Session refresh failed');
      await this.handleSignOut();
    }
  }

  private scheduleTokenRefresh(expiresIn: number): void {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
    }

    const refreshTime = (expiresIn - (this.config.refreshThresholdMinutes * 60)) * 1000;
    this.refreshTimeout = setTimeout(() => this.refreshToken(), refreshTime);
  }

  public async handleSignOut(): Promise<void> {
    try {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout);
      }

      await supabase.auth.signOut();
      this.broadcastSessionState({ event: 'SIGNED_OUT' });
      useAuthStore.getState().reset();
      
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Error signing out');
    }
  }

  private broadcastSessionState(state: any): void {
    localStorage.setItem('auth_session_state', JSON.stringify(state));
  }

  public checkSessionTimeout(): boolean {
    const lastActivity = new Date(localStorage.getItem('last_activity') || this.lastActivity);
    const now = new Date();
    const minutesSinceLastActivity = (now.getTime() - lastActivity.getTime()) / (1000 * 60);

    return minutesSinceLastActivity > this.config.timeoutMinutes;
  }

  public async validateSession(): Promise<boolean> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;

      if (!session) return false;

      if (this.checkSessionTimeout()) {
        await this.handleSignOut();
        toast.error('Session expired due to inactivity');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Session validation error:', error);
      return false;
    }
  }

  public destroy(): void {
    if (typeof window !== 'undefined') {
      ['mousedown', 'keydown', 'touchstart', 'scroll'].forEach(event => {
        window.removeEventListener(event, this.boundHandleActivity);
      });
      window.removeEventListener('storage', this.boundHandleStorage);
    }

    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
    }
  }
}

export const sessionManager = SessionManager.getInstance();