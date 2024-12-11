import { SessionConfig, SessionState, SessionEventType } from './types/auth';

const DEFAULT_CONFIG: SessionConfig = {
  refreshInterval: 5 * 60 * 1000, // 5 minutes
  sessionTimeout: 30 * 60 * 1000, // 30 minutes
  storageKey: 'auth_session_state'
};

export class SessionManager {
  private static instance: SessionManager;
  private refreshTimeout?: NodeJS.Timeout;
  private config: SessionConfig;
  private lastActivity: Date;
  private readonly activityEvents: SessionEventType[] = ['mousedown', 'keydown', 'touchstart', 'scroll'];
  private boundHandleActivity: () => void;
  private boundHandleStorage: (event: StorageEvent) => void;

  private constructor(config: Partial<SessionConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.lastActivity = new Date();
    this.boundHandleActivity = this.updateLastActivity.bind(this);
    this.boundHandleStorage = this.handleStorageEvent.bind(this);
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

    window.addEventListener('storage', this.boundHandleStorage);
  }

  private handleStorageEvent(event: StorageEvent): void {
    if (event.key === this.config.storageKey) {
      this.handleCrossTabSync(event.newValue);
    }
  }

  private async handleCrossTabSync(newState: string | null): Promise<void> {
    if (!newState) return;

    try {
      const state: SessionState = JSON.parse(newState);
      await this.syncSessionState(state);
    } catch (error) {
      console.error('Error syncing session state:', error);
    }
  }

  private updateLastActivity(): void {
    this.lastActivity = new Date();
    this.checkSessionTimeout();
  }

  private async syncSessionState(state: SessionState): Promise<void> {
    // Implement session state synchronization logic
    console.log('Syncing session state:', state);
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

  private async refreshSession(): Promise<void> {
    try {
      // Implement token refresh logic here
      this.scheduleNextRefresh();
    } catch (error) {
      if (error instanceof Error && this.config.onRefreshError) {
        this.config.onRefreshError(error);
      }
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

  public startSession(): void {
    this.updateLastActivity();
    this.scheduleNextRefresh();
  }

  public destroy(): void {
    if (typeof window === 'undefined') return;

    this.activityEvents.forEach(event => {
      window.removeEventListener(event, this.boundHandleActivity);
    });
    
    window.removeEventListener('storage', this.boundHandleStorage);

    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
    }
  }
}
