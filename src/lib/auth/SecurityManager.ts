import { SessionManager } from './SessionManager';

export class SecurityManager {
  private sessionManager: SessionManager;

  constructor() {
    this.sessionManager = SessionManager.getInstance({
      onSessionExpired: this.handleSessionExpired.bind(this),
      onRefreshError: this.handleRefreshError.bind(this)
    });
  }

  private handleSessionExpired(): void {
    console.log('Session expired');
  }

  private handleRefreshError(error: Error): void {
    console.error('Session refresh error:', error);
  }

  public initialize(): void {
    this.sessionManager.startSession();
  }

  public clearSecurityData(): void {
    // Clear any security-related data
    console.log('Clearing security data');
  }

  public cleanup(): void {
    this.sessionManager.destroy();
  }
}

export const securityManager = new SecurityManager();