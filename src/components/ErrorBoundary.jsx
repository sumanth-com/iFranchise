import { Component } from 'react';
import { logger } from '../lib/logger';

/**
 * Isolates render failures so the rest of the app keeps working.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    logger.error(this.props.label || 'Component error', error?.message);
    if (import.meta.env.DEV && info?.componentStack) {
      logger.log(info.componentStack);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div
          className="relative z-10 flex min-h-[40vh] flex-col items-center justify-center gap-4 px-6 text-center"
          role="alert"
        >
          <p className="text-sm font-medium text-white">Something went wrong loading this section.</p>
          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false });
              this.props.onRetry?.();
            }}
            className="rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-500"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
