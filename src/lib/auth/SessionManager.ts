import { SessionConfig, SessionState } from './types/auth';
import { initializeSessionSync } from '@/utils/auth/sessionSync';

export class SessionManager {
  private static instance: SessionManager;
  private refreshTimeout?: NodeJS.Timeout;
  private config: SessionConfig;
  private lastActivity: Date;
  private readonly activityEvents: string[] = ['mousedown', 'keydown', 'touchstart', 'scroll'];
  private boundHandleActivity: () => void;
  private cleanupSync: (() => void) | null = null;

  private constructor(config: Partial<SessionConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.lastActivity = new Date();
    this.boundHandleActivity = this.updateLastActivity.bind(this);
    this.setupEventListeners();
  }

  public static getInstance(config?: Partial<SessionConfig>): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager(config);
    }
    return SessionManager.instance;
  }

  private setupEventListeners(): void {
    if (typeof window === 'undefined') return;
    
    this.activityEvents.forEach(event => {
      window.addEventListener(event, this.boundHandleActivity);
    });
  }

  private updateLastActivity(): void {
    this.lastActivity = new Date();
    this.checkSessionTimeout();
  }

  private checkSessionTimeout(): void {
    const now = new Date();
    const timeSinceLastActivity = now.getTime() - this.lastActivity.getTime();

    if (timeSinceLastActivity > this.config.sessionTimeout) {
      this.handleSessionTimeout();
    }
  }

  private handleSessionTimeout(): void {
    if (this.config.onSessionExpired) {
      this.config.onSessionExpired();
    }
    this.destroy();
  }

  public async handleSignOut(): Promise<void> {
    try {
      // Clear any active timeouts
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout);
      }

      // Remove event listeners
      if (typeof window !== 'undefined') {
        this.activityEvents.forEach(event => {
          window.removeEventListener(event, this.boundHandleActivity);
        });
      }

      // Clean up sync mechanism
      if (this.cleanupSync) {
        this.cleanupSync();
        this.cleanupSync = null;
      }

      // Clear session data
      this.lastActivity = new Date();
      
      console.log('Session cleanup completed during sign out');
    } catch (error) {
      console.error('Error during session cleanup:', error);
      throw error;
    }
  }

  public startSession(): void {
    this.updateLastActivity();
    this.scheduleNextRefresh();
    
    // Initialize cross-tab sync
    if (!this.cleanupSync) {
      this.cleanupSync = initializeSessionSync();
    }
  }

  private scheduleNextRefresh(): void {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
    }

    this.refreshTimeout = setTimeout(
      () => this.refreshSession(),
      this.config.refreshInterval
    );
  }

  private async refreshSession(): Promise<void> {
    try {
      // Implement refresh logic
      this.scheduleNextRefresh();
    } catch (error) {
      if (error instanceof Error && this.config.onRefreshError) {
        this.config.onRefreshError(error);
      }
    }
  }

  public destroy(): void {
    if (typeof window === 'undefined') return;

    this.activityEvents.forEach(event => {
      window.removeEventListener(event, this.boundHandleActivity);
    });
    
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
    }

    if (this.cleanupSync) {
      this.cleanupSync();
      this.cleanupSync = null;
    }
  }
}

const DEFAULT_CONFIG: SessionConfig = {
  refreshInterval: 5 * 60 * 1000, // 5 minutes
  sessionTimeout: 30 * 60 * 1000, // 30 minutes
  storageKey: 'auth_session_state'
};

export const sessionManager = SessionManager.getInstance();