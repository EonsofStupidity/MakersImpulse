type WebSocketState = 'CONNECTING' | 'CONNECTED' | 'DISCONNECTED' | 'RECONNECTING' | 'FAILED';

interface WebSocketHandlerConfig {
  url: string;
  maxRetries?: number;
  initialRetryDelay?: number;
  maxRetryDelay?: number;
  onMessage?: (event: MessageEvent) => void;
  onStateChange?: (state: WebSocketState) => void;
}

export class WebSocketHandler {
  private ws: WebSocket | null = null;
  private retryCount = 0;
  private retryTimeout: number | null = null;
  private currentState: WebSocketState = 'DISCONNECTED';

  private readonly maxRetries: number;
  private readonly initialRetryDelay: number;
  private readonly maxRetryDelay: number;

  constructor(private config: WebSocketHandlerConfig) {
    this.maxRetries = config.maxRetries ?? 5;
    this.initialRetryDelay = config.initialRetryDelay ?? 1000;
    this.maxRetryDelay = config.maxRetryDelay ?? 30000;
  }

  private setState(newState: WebSocketState) {
    this.currentState = newState;
    this.config.onStateChange?.(newState);
    console.log(`WebSocket state changed to: ${newState}`);
  }

  private calculateRetryDelay(): number {
    // Exponential backoff: delay = min(initialDelay * 2^retryCount, maxDelay)
    const delay = Math.min(
      this.initialRetryDelay * Math.pow(2, this.retryCount),
      this.maxRetryDelay
    );
    return delay;
  }

  public connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      console.log('WebSocket is already connected');
      return;
    }

    try {
      this.setState('CONNECTING');
      this.ws = new WebSocket(this.config.url);
      this.setupEventHandlers();
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      this.handleReconnect();
    }
  }

  private setupEventHandlers(): void {
    if (!this.ws) return;

    this.ws.onopen = () => {
      console.log('WebSocket connected successfully');
      this.setState('CONNECTED');
      this.retryCount = 0; // Reset retry count on successful connection
    };

    this.ws.onmessage = (event) => {
      this.config.onMessage?.(event);
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.ws.onclose = () => {
      console.log('WebSocket connection closed');
      this.handleReconnect();
    };
  }

  private handleReconnect(): void {
    if (this.retryCount >= this.maxRetries) {
      console.error('Maximum reconnection attempts reached');
      this.setState('FAILED');
      return;
    }

    this.setState('RECONNECTING');
    const delay = this.calculateRetryDelay();
    console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.retryCount + 1}/${this.maxRetries})`);

    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }

    this.retryTimeout = window.setTimeout(() => {
      this.retryCount++;
      this.connect();
    }, delay);
  }

  public disconnect(): void {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
      this.retryTimeout = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    this.setState('DISCONNECTED');
  }

  public getState(): WebSocketState {
    return this.currentState;
  }

  public send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(data);
    } else {
      console.warn('Cannot send message: WebSocket is not connected');
    }
  }
}

// Usage example:
/*
const wsHandler = new WebSocketHandler({
  url: 'wss://your-websocket-url',
  maxRetries: 5,
  onMessage: (event) => console.log('Received:', event.data),
  onStateChange: (state) => console.log('State changed:', state)
});

wsHandler.connect();
*/