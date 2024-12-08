import React from 'react';
import { ErrorState } from '@/components/shared/error-handling/ErrorState';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class CMSErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('CMS Error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorState
          title="CMS Error"
          message={this.state.error?.message || 'An unexpected error occurred in the CMS.'}
          onRetry={this.handleRetry}
        />
      );
    }

    return this.props.children;
  }
}