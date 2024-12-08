import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class AnalyticsErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Analytics Error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Alert variant="destructive" className="my-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Analytics Error</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-2">
              {this.props.componentName 
                ? `Failed to load ${this.props.componentName}`
                : 'An error occurred while loading analytics'
              }
            </p>
            <Button onClick={this.handleRetry} variant="outline" size="sm">
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      );
    }

    return this.props.children;
  }
}